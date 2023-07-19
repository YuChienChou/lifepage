from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_posts():
    post1 = Post(
        img = 'https://devblogs.microsoft.com/python/wp-content/uploads/sites/12/2018/08/pythonfeature.png',
        video = '',
        body = 'Python is a versatile programming language.',
        user_id =  1,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post2 = Post(
        img = 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg',
        video = '',
        body = 'Check out this breathtaking landscapes from a remote mountain.',
        user_id =  2,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post3 = Post(
        img = '',
        video = 'https://www.youtube.com/watch?v=n3kNlFMXslo&t=62s&ab_channel=TED',
        body = 'Learn how to manage your time more efficiently and achieve your goals.',
        user_id =  3,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post4 = Post (
        img = 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        video = '',
        body = 'Discover some mouth-watering recipes that are easy to make at home.',
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post5 = Post (
        img = ,
        video = ,
        body = ,
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post6 = Post (
        img = ,
        video = ,
        body = ,
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post7 = Post (
        img = ,
        video = ,
        body = ,
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post8 = Post (
        img = ,
        video = ,
        body = ,
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post9 = Post (
        img = ,
        video = ,
        body = ,
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post10 = Post (
        img = ,
        video = ,
        body = ,
        user_id = ,
        created_at = date.today(),
        updated_at = date.today(),
    )
    

    post_list = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10]
    db.session.add_all(post_list)
    db.session.commit()
    print("Posts seeded to db")


def undo_posts(): 
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()