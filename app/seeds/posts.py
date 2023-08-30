from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_posts():
    post1 = Post(
        media = 'https://devblogs.microsoft.com/python/wp-content/uploads/sites/12/2018/08/pythonfeature.png',
        share_img = "",
        share_video = "",
        body = 'Python is a versatile programming language.',
        user_id =  1,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post2 = Post(
        media = 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg',
        share_img = "",
        share_video = "",
        body = 'Check out this breathtaking landscapes from a remote mountain.',
        user_id =  2,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post3 = Post(
        media = 'https://www.youtube.com/watch?v=n3kNlFMXslo&t=62s&ab_channel=TED',
        share_img = "",
        share_video = "",
        body = 'Learn how to manage your time more efficiently and achieve your goals.',
        user_id =  3,
        created_at =  date.today(),
        updated_at =  date.today(),
    )
    post4 = Post (
        media = 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        share_img = "",
        share_video = "",
        body = 'Delicious food always makes me happy~~ 😘',
        user_id = 5,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post5 = Post (
        media = 'https://www.youtube.com/watch?v=ukzFI9rgwfU&ab_channel=Simplilearn',
        share_img = "",
        share_video = "",
        body = "Machine learning is a fascinating field with numerous applications.",
        user_id = 5,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post6 = Post (
        media = 'https://www.youtube.com/watch?v=H2U3HwAyBXg&ab_channel=MadFit',
        share_img = "",
        share_video = "",
        body = 'Regular exercise has numerous benefits for both the body and mind.',
        user_id = 4,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post7 = Post (
        media = 'https://images.pexels.com/photos/147640/pexels-photo-147640.jpeg',
        share_img = "",
        share_video = "",
        body = 'Feeling blessed and grateful today.',
        user_id = 4,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post8 = Post (
        media = 'https://images.pexels.com/photos/4931332/pexels-photo-4931332.jpeg',
        share_img = "",
        share_video = "",
        body = 'Having a great time with friends! 😄',
        user_id = 3,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post9 = Post (
        media = 'https://www.youtube.com/watch?v=WqZiBugq4ts&ab_channel=HarvardBusinessReview',
        share_img = "",
        share_video = "",
        body = 'Tips for Productive Remote Work.',
        user_id = 6,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post10 = Post (
        media = 'https://images.pexels.com/photos/1188470/pexels-photo-1188470.jpeg',
        share_img = "",
        share_video = "",
        body = 'Throwback to an amazing vacation! ',
        user_id = 6,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post11 = Post (
        media = 'https://images.pexels.com/photos/8052693/pexels-photo-8052693.jpeg',
        share_img = "",
        share_video = "",
        body = 'Just enjoying a cup of coffee and the beautiful view.',
        user_id = 1,
        created_at = date.today(),
        updated_at = date.today(),
    )
    post12 = Post (
        media = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
        share_img = "",
        share_video = "",
        body = 'Excited about the upcoming project! 🚀',
        user_id = 2,
        created_at = date.today(),
        updated_at = date.today(),
    )
    

    post_list = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12]
    db.session.add_all(post_list)
    db.session.commit()
    print("Posts seeded to db")


def undo_posts(): 
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()