from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', 
        email='demo@aa.io', 
        password='password',
        first_name = 'Demo',
        last_name = 'Lition',
        phone = '452-1236985',
        birth_date = date(2003, 10, 5),
        bio = "I love sharing my life with my family and friends!",
        hobbies = 'snowboarding',
        profile_picture = 'https://images.unsplash.com/photo-1598084991540-50ea616becbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        cover_photo = 'https://images.unsplash.com/photo-1620771429110-ad0fc953bf93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80',
        created_at = date.today(),
        updated_at = date.today(),
        )
    marnie = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password',
        first_name = 'Marnie',
        last_name = 'Lovely',
        phone = '745-8962135',
        birth_date = date(1998, 6, 15),
        bio = "Let the world knows that I'm one of the kind.",
        hobbies = 'Gaming',
        profile_picture = 'https://plus.unsplash.com/premium_photo-1669689972354-dd07170fa47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        cover_photo = 'https://images.unsplash.com/photo-1510070009289-b5bc34383727?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
        created_at = date.today(),
        updated_at = date.today(),
        )
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        first_name = 'Bobbie',
        last_name = 'Handsome',
        phone = '542-1236958',
        birth_date = date(1996, 4, 9),
        bio = "I'm Bobbie, I love my life!",
        hobbies = 'Taking adventures',
        profile_picture = 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        cover_photo = 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        created_at = date.today(),
        updated_at = date.today(),
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()
    print("Users seeded to db")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()