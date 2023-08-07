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
        phone = '4521236985',
        birth_date = date(2003, 10, 5),
        bio = "I love sharing my life with my family and friends!",
        hobbies = 'snowboarding',
        profile_picture = 'https://images.pexels.com/photos/2069940/pexels-photo-2069940.jpeg',
        cover_photo = 'https://images.pexels.com/photos/1415734/pexels-photo-1415734.jpeg',
        created_at = date.today(),
        updated_at = date.today(),
        )
    marnie = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password',
        first_name = 'Marnie',
        last_name = 'Lovely',
        phone = '7458962135',
        birth_date = date(1998, 6, 15),
        bio = "Let the world knows that I'm one of the kind.",
        hobbies = 'Gaming',
        profile_picture = 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
        cover_photo = 'https://images.pexels.com/photos/295771/pexels-photo-295771.jpeg',
        created_at = date.today(),
        updated_at = date.today(),
        )
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        first_name = 'Bobbie',
        last_name = 'Handsome',
        phone = '5421236958',
        birth_date = date(1996, 4, 9),
        bio = "I'm Bobbie, I love my life!",
        hobbies = 'Taking adventures',
        profile_picture = 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
        cover_photo = 'https://images.pexels.com/photos/347149/pexels-photo-347149.jpeg',
        created_at = date.today(),
        updated_at = date.today(),
        )
    menfred = User(
        username='menfred',
        email = 'menfred@aa.io' ,
        password = 'password' ,
        first_name = 'Menfred' ,
        last_name = 'Lipsey' ,
        phone = '5894452315',
        birth_date = date(1995, 7, 13),
        bio = 'Enjoy every moment of my life.',
        hobbies = 'Gardening',
        profile_picture = 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
        cover_photo = 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg',
        created_at = date.today(),
        updated_at = date.today()
    )
    emily = User(
        username='emily',
        email = 'emily@aa.io',
        password = 'password',
        first_name = 'Emily',
        last_name = 'Wallaker',
        phone = '5489951273',
        birth_date = date(1997, 2, 9),
        bio = "Passionate explorer and lifelong learner, constantly seeking new adventures and knowledge to enrich my journey.",
        hobbies = 'Learing new things!',
        profile_picture = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        cover_photo = "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg",
        created_at = date.today(),
        updated_at = date.today()
    )
    alex = User(
        username= 'alex',
        email = 'alex@aa.io',
        password = 'password',
        first_name = "Alex",
        last_name = "Nelson",
        phone = '7583125982',
        birth_date = date(2003, 9, 21),
        bio = "Advocate for sustainability and animal rights, striving to make a positive impact on the world through small daily actions.",
        hobbies = 'Spending time with my puppy!',
        profile_picture = 'https://images.pexels.com/photos/4666747/pexels-photo-4666747.jpeg',
        cover_photo = "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
        created_at = date.today(),
        updated_at = date.today()
    )
    

    user_list = [demo, marnie, bobbie, menfred, emily, alex]
    db.session.add_all(user_list)
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