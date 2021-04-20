from .db import db
from .user import User


class GigType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    description = db.Column(db.String(1000))
    cost = db.Column(db.Integer)
    owner = db.Column(db.Integer, db.ForeignKey(User.id))
    duration = db.Column(db.Interval)

    def __repr__(self):
        return '<GigType {}>'.format(self.title)