# Handle gig entity
from flask import Blueprint, jsonify, session, request
from app.models import (User, db, GigType, GigRequest)
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user


gigs_routes = Blueprint('gigs', __name__)


@gigs_routes.route('/new-plan', methods=['POST'])
@login_required
def create_gig_plan():
    title = request.form["title"]
    description = request.form["description"]
    cost = request.form["cost"]
    owner = request.form["userId"]
    duration = request.form['duration']

    gig_plan = GigType(
        title=title,
        description=description,
        cost=cost,
        owner=owner,
        duration=duration
    )
    db.session.add(gig_plan)
    db.session.flush()
    db.session.commit()
    return {'message': "Success"}


@gigs_routes.route('/gigs/<int:gigId>/delete', methods=['DELETE'])
@login_required
def delete_gig_plan(gigId):
    gigPlanToDelete = GigType.query.filter(GigType.gigId == gigId, gigId)

    db.session.remove(gigPlanToDelete)
    db.session.flush()
    db.session.commit()
    return {'message': "Successfully Deleted"}
