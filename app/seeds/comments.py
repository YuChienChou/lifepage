from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_comments():
    comment1 = Comment(
        content = "I'm learning Python and it's so fun!",
        post_id = 1,
        user_id = 3,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment2 = Comment(
        content = 'What a beautiful scene!',
        post_id = 2, 
        user_id = 3, 
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment3 = Comment(
        content = "I've been working with Python for years and it's really a versatile programming language.",
        post_id = 1, 
        user_id = 2, 
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment4 = Comment(
        content = 'I really need to better manage my time! Thanks for sharing!',
        post_id = 3, 
        user_id = 2, 
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment5 = Comment(
        content = "Really it's a paridise!!!",
        post_id = 2,
        user_id = 1,
        created_at = date.today(),
        updated_at = date.today(),

    )
    comment6 = Comment(
        content = 'I love this speech!',
        post_id = 3,
        user_id = 1,
        created_at = date.today(),
        updated_at = date.today(),
    )


    comment_list = [comment1, comment2, comment3, comment4, comment5, comment6]
    db.session.add_all(comment_list)
    db.session.commit()
    print("Comments seeded to db")


def undo_comments(): 
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()