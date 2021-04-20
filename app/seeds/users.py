from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
import random
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():

    mastergig = User(username='MasterGiG', email='mastergig@gmail.com',
                     password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                     bio='MasterGiG Super Admin', websiteUrl="masterGiG.com", name='MasterGiG', profilePicUrl="https://i.pinimg.com/originals/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg",
                     admin_status=True, wallet_balance=5000000, active_status=True)
    db.session.add(mastergig)

    admin = User(username='admin', email='mastergig_admin@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='MasterGiG Admin', websiteUrl="masterGiG.com", name='Admin', profilePicUrl="https://i.pinimg.com/originals/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg",
                 admin_status=True, wallet_balance=0, active_status=True)
    db.session.add(admin)

    user2 = User(username='Prof', email='user2@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='Tired Student', websiteUrl="user2@gmail.com", name='Prof',
                 profilePicUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRny6M7SVLugIiTJGIYPcr744JSqVf5oPe1Vg&usqp=CAU",
                 admin_status=False, wallet_balance=5000, active_status=True)
    db.session.add(user2)

    user3 = User(username='Pei Xiang', email='user3@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='Artist for hire', websiteUrl="user3@gmail.com", name='Pei Xiang',
                 profilePicUrl="https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop",
                 admin_status=False, wallet_balance=10000, active_status=True)
    db.session.add(user3)

    user4 = User(username='Liu Chang', email='user4@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='Patron of the Arts', websiteUrl="user4@gmail.com", name='Liu Chang',
                 profilePicUrl="https://expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                 admin_status=False, wallet_balance=100000, active_status=True)
    db.session.add(user4)

    user5 = User(username='Sufiyan', email='user5@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='Breakdancer', websiteUrl="www.sufiboy.com", name='Sufiyan',
                 profilePicUrl="https://i.guim.co.uk/img/media/7a633730f5f90db3c12f6efc954a2d5b475c3d4a/0_138_5544_3327/master/5544.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=27c09d27ccbd139fd0f7d1cef8f7d41d",
                 admin_status=False, wallet_balance=2000, active_status=True)
    db.session.add(user5)

    user6 = User(username='Ian', email='user6@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='Artist for hire', websiteUrl="user6@gmail.com", name='Ian',
                 profilePicUrl="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/reference_guide/cats_and_excessive_meowing_ref_guide/1800x1200_cats_and_excessive_meowing_ref_guide.jpg",
                 admin_status=False, wallet_balance=5000, active_status=True)
    db.session.add(user6)

    user7 = User(username='Hengyee', email='user7@gmail.com',
                 password='pbkdf2:sha256:150000$DbaLbRPn$7e084999c0cd3cfb562052a7fa6ca70f5aa80a9c250f0c793b06d48c24ca069e',
                 bio='I like to sing and dance', websiteUrl="www.KpopStarHengyeee.com", name='Hengyee',
                 profilePicUrl="https://images.theconversation.com/files/168121/original/file-20170505-1693-ymh4bc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
                 admin_status=False, wallet_balance=100000, active_status=True)
    db.session.add(user7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
