from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    imgUrl = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=db.func.now()) #func.sysdate())
    updatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), server_onupdate=db.func.now())



    # to_dict method to convert a dataframe into a dictionary of series or list like data type depending on orient parameter
    def to_dict(self):
        return {
        "id": self.id,
        "postId": self.postId,
        "imgUrl": self.imgUrl
        }
        

