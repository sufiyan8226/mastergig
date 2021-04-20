from .db import db
from .user import User
from datetime import datetime


class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey(User.id))
    url = db.Column(db.String)
    title = db.Column(db.String)
    description = db.Column(db.String)
    thumbnail = db.Column(db.String)
    likes = db.Column(db.Integer)
    view_count = db.Column(db.Integer)
    download_count = db.Column(db.Integer)
    is_free = db.Column(db.Boolean, default=True)
    category = db.Column(db.String)

    def __repr__(self):
        return '<Video {}>'.format(self.title)

    def set_thumbnail(self, url):
        self.thumbnail = url

    def set_url(self, url):
        self.url = url

    def toggle_status(self):
        if self.is_free:
            self.is_free = False
        else:
            self.is_free = True