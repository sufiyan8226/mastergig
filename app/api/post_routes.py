from flask import Blueprint, jsonify, redirect, request
from sqlalchemy import any_
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from app.models import db, Post, Image, User
from ..helpers import *
from ..config import Config
import json


post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
# @login_required
def allPosts():
    # query to grab all posts
    posts = Post.query.all()
    return {
        "posts": [post.to_dict() for post in posts]
    }


@post_routes.route("/explore/<int:page>")
def explore_infinite(page):
    feed = Post.query.order_by(Post.createdAt.desc()).offset(page*24).limit(24)
    feed_list = [post.to_dict() for post in feed]
    return {'posts': {post["id"]: post for post in feed_list}}


@post_routes.route("/", methods=["POST"])
@login_required
def create_post():

    image = request.files["image"]
    user_id = request.form["userId"]
    mentioned_users = request.form["mentionedUsers"]
    mentioned_users = json.loads(mentioned_users)
    hashtags = request.form["hashtags"]
    hashtags = json.loads(hashtags)
    raw_data = request.form["rawData"]

    post = Post(
        userId=user_id,
        captionRawData=raw_data
    )
    db.session.add(post)
    db.session.flush()

    image.filename = secure_filename(image.filename)
    imgUrl = upload_file_to_s3(image, Config.S3_BUCKET)
    print(imgUrl)
    new_image = Image(
        postId=post.id,
        imgUrl=imgUrl
    )
    db.session.add(new_image)

    db.session.commit()
    return {post.id: post.to_dict()}


@post_routes.route("/<int:userId>/feed")
def homeFeed(userId):
    user = User.query.get(userId)
    following = user.to_dict_feed()
    following_list = following["followingIds"]
    following_list.append(userId)
    feed = Post.query.filter(Post.userId.in_(following_list)).order_by(
        Post.createdAt.desc()).all()
    return {'posts': [post.to_dict() for post in feed]}


@post_routes.route("/<int:userId>/feed/<int:page>")
def homeFeedInfinite(userId, page):
    user = User.query.get(userId)
    following = user.to_dict_feed()
    following_list = following["followingIds"]
    following_list.append(userId)
    feed = Post.query.filter(Post.userId.in_(following_list)).order_by(
        Post.createdAt.desc()).offset(page*8).limit(8)
    feed_list = [post.to_dict() for post in feed]
    return {'posts': {post["id"]: post for post in feed_list}}


@post_routes.route("/<int:postId>")
def single_post(postId):
    post = Post.query.get(postId)
    return {'post': post.to_dict()}
