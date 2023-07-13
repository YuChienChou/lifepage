from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(15))
    birth_date = db.Column(db.Date)
    bio = db.Column(db.String(500))
    hobbies = db.Column(db.String(500))
    profile_picture = db.Column(db.String(255))
    cover_photo = db.Column(db.String(255))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship("Post", back_populates="user", cascade="delete, merge, save-update")
    comments = db.relationship("Comment", back_populates="user", cascade="delete, merge, save-update")

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
        }
