from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

requests = db.Table(
    "requests",
    db.Column("request", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("requested", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

if environment == "production":
    requests.schema = SCHEMA

friends = db.Table(
    "friends",
    db.Column("friend", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("friend_added", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

if environment == "production":
    friends.schema = SCHEMA

follows = db.Table(
    "follows",
    db.Column("follower", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

if environment == "production":
    follows.schema = SCHEMA


user_likes = db.Table(
    "user_likes",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("post_id", db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True),
)

if environment == "production":
    user_likes.schema = SCHEMA



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(12))
    birth_date = db.Column(db.Date)
    bio = db.Column(db.String(500))
    hobbies = db.Column(db.String(300))
    profile_picture = db.Column(db.String(255))
    cover_photo = db.Column(db.String(255))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship(
        "Post", 
        back_populates="user", 
        cascade="delete, merge, save-update"
    )

    comments = db.relationship(
        "Comment", 
        back_populates="user", 
        cascade="delete, merge, save-update"
    )

    likes = db.relationship(
        "Post", 
        secondary = "user_likes", 
        cascade="delete, merge, save-update", 
        back_populates="likes"
    )

    followers = db.relationship(
        "User", 
        secondary="follows", 
        primaryjoin=follows.columns.followed == id,
        secondaryjoin=follows.columns.follower == id, 
        backref="followed", 
    )

    friends = db.relationship(
        "User",
        secondary="friends",
        primaryjoin=friends.columns.friend_added == id,
        secondaryjoin=friends.columns.friend == id,
        backref='friend_added',
    )

    requests = db.relationship(
        "User",
        secondary="requests",
        primaryjoin=requests.columns.requested == id,
        secondaryjoin=requests.columns.request == id,
        backref="requested",
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'birth_date': self.birth_date,
            'bio': self.bio,
            'hobbies': self.hobbies,
            'profile_picture': self.profile_picture,
            'cover_photo': self.cover_photo,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'likes' : [like.to_dict() for like in self.likes],
            'likes' : [{'id': like.id} for like in self.likes],
            'requests' : [{'id' : user.id} for user in self.requests],
            # 'follows': [follow.to_dict() for follow in self.followed],
            'follows': [{'id': follow.id} for follow in self.followed],
            'friends' : [{'id': friend.id, 'username': friend.username, 'user_first_name': friend.first_name, 'profile_picture': friend.profile_picture, } for friend in self.friends],
            # 'follows' : [{'id': follow.id, 'username': follow.username, 'user_first_name': follow.first_name, 'profile_picture': follow.profile_picture, } for follow in self.followers],
        }
