
from .db import db
from .user import User
from datetime import datetime


class StreamEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    title = db.Column(db.String)
    description = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(User.id))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    def __repr__(self):
        return '<StreamEvent {}>'.format(self.title)