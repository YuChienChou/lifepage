from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_posts():
    post1 = Post(
        # title = 'Introduction to Python',
        img = 'https://devblogs.microsoft.com/python/wp-content/uploads/sites/12/2018/08/pythonfeature.png',
        video = '',
        body = 'Python is a versatile programming language.',
        user_id =  1,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post2 = Post(
        # title = 'Beautiful Landscapes',
        img = 'https://images.unsplash.com/photo-1619994948937-ef1e758d46ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80',
        video = '',
        body = 'Check out this breathtaking landscapes from a remote mountain.',
        user_id =  2,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post3 = Post(
        # title = 'How to gain control of your free time',
        img = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        video = 'https://www.youtube.com/watch?v=n3kNlFMXslo&t=62s&ab_channel=TED',
        body = 'Learn how to manage your time more efficiently and achieve your goals.',
        user_id =  3,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    

    post_list = [post1, post2, post3]
    db.session.add_all(post_list)
    db.session.commit()
    print("Posts seeded to db")


def undo_posts(): 
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()