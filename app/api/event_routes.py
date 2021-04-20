from flask import Blueprint, jsonify, session, request
from app.models import (User, db)


event_routes = Blueprint('event', __name__)
