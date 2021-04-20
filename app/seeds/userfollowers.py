from werkzeug.security import generate_password_hash
from random import randint
from app.models import db, User, UserFollower

# Adds a demo user, you can add other users here if you want


def seed_followers():

    demo = UserFollower(userId=2, followerId=3)
    db.session.add(demo)

    demo2 = UserFollower(userId=2, followerId=4)
    db.session.add(demo2)

    demo3 = UserFollower(userId=2, followerId=5)
    db.session.add(demo3)

    demo4 = UserFollower(userId=3, followerId=5)
    db.session.add(demo4)

    demo5 = UserFollower(userId=3, followerId=6)
    db.session.add(demo5)

    demo6 = UserFollower(userId=3, followerId=2)
    db.session.add(demo6)

    demo7 = UserFollower(userId=4, followerId=2)
    db.session.add(demo7)

    demo8 = UserFollower(userId=3, followerId=5)
    db.session.add(demo8)

    demo9 = UserFollower(userId=3, followerId=6)
    db.session.add(demo9)

    demo10 = UserFollower(userId=3, followerId=7)
    db.session.add(demo10)

    demo11 = UserFollower(userId=4, followerId=3)
    db.session.add(demo11)

    demo12 = UserFollower(userId=4, followerId=5)
    db.session.add(demo12)

    demo13 = UserFollower(userId=2, followerId=7)
    db.session.add(demo13)

    demo14 = UserFollower(userId=7, followerId=2)
    db.session.add(demo14)

    demo15 = UserFollower(userId=7, followerId=3)
    db.session.add(demo15)

    demo16 = UserFollower(userId=4, followerId=7)
    db.session.add(demo16)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_followers():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
