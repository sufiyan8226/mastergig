
from .db import db
from .user import User

class VideoCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(User.id))
    category_name = db.Column(db.String)

    def __repr__(self):
        return '<VideoCategory {}>'.format(self.category_name)