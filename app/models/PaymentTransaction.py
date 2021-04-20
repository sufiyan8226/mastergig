from .db import db
from datetime import datetime
from .user import User


class PaymentTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer, db.ForeignKey(User.id))
    receiver_id = db.Column(db.Integer, db.ForeignKey(User.id))
    amount = db.Column(db.Integer)
    description = db.Column(db.String)

    def __repr__(self):
        return '<PaymentTransaction {}>'.format(self.timestamp + ": " + self.description + ": " + self.amount)