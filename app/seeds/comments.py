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
    comment7 = Comment(
        content = 'Everybody loves delicious food~ 🤤',
        post_id = 4,
        user_id = 6,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment8 = Comment(
        content = 'Yummy yummy!',
        post_id = 4,
        user_id = 5,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment9 = Comment(
        content = "I'm greatful for each day of my life too!",
        post_id = 7,
        user_id = 4,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment10 = Comment(
        content = 'Wish I could be with you guys!',
        post_id = 8,
        user_id = 6,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment11 = Comment(
        content = 'Useful tips!',
        post_id = 9,
        user_id = 3,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment12 = Comment(
        content = 'And feel the inner peace.',
        post_id = 11,
        user_id = 4,
        created_at = date.today(),
        updated_at = date.today(),
    )
    comment13 = Comment(
        content = "GOGOGO!!!",
        post_id = 12,
        user_id = 5,
        created_at = date.today(),
        updated_at = date.today(),
    )


    comment_list = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13]
    db.session.add_all(comment_list)
    db.session.commit()
    print("Comments seeded to db")


def undo_comments(): 
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()