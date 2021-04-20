from .db import db
from .user import User
from datetime import datetime


class TopUpTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey(User.id))
    amount = db.Column(db.Integer)

    def __repr__(self):
        return '<TopUpTransaction {}>'.format(self.timestamp + ": " + self.amount)
