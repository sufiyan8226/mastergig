from .GigRequest import GigRequest
from .db import db
from .user import User
from datetime import datetime




class GigEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    gig_request = db.Column(db.Integer, db.ForeignKey(GigRequest.id))
    requester_id = db.Column(db.Integer, db.ForeignKey(User.id))
    content_creator_id = db.Column(db.Integer, db.ForeignKey(User.id))
    status = db.Column(db.String, default='upcoming')

    def __repr__(self):
        return '<GigEvent {}>'.format(self.id)

    def set_status_pending_feedback(self):
        self.status = 'pending feedback'

    def set_status_complete(self):
        self.status = 'complete'
