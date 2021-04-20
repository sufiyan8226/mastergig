from .db import db

class Post(db.Model):
    __tablename__ = 'posts'


    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    captionRawData = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=db.func.now()) #func.sysdate())
    updatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), server_onupdate=db.func.now())

 
    # Model name is title case and singular
    user = db.relationship('User', foreign_keys=userId)  #owner of the post
    images = db.relationship('Image', foreign_keys='Image.postId')




    # to_dict method to convert a dataframe into a dictionary of series or list like data type depending on orient parameter
    def to_dict(self):       
        return {
            "id": self.id,
            "userId": self.userId,
            "createdAt": self.createdAt,
            "user": self.user.to_dict_no_posts(),   #no posts so if a post has this user, there is no infinite circular references
            "images": [image.to_dict() for image in self.images],
        }

    def to_dict_for_self(self):       
        return {
            "id": self.id,
            "userId": self.userId,
            "images": [image.to_dict() for image in self.images],
        }