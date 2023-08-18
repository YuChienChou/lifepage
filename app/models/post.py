from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String(100))
    # img = db.Column(db.String(255))
    # video = db.Column(db.String(255))
    media = db.Column(db.String(500))
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    user = db.relationship(
        "User", 
        back_populates="posts"
    )

    # medias = db.relationship(
    #     'Media',
    #     cascade="delete, merge, save-update",
    #     back_populates="post"
    # )
    
    comments = db.relationship(
        'Comment', 
        cascade="delete, merge, save-update", 
        back_populates="post"
    )

    likes = db.relationship(
        "User", 
        secondary="user_likes", 
        back_populates="likes"
    )

    def to_dict(self):
        return {
            'id': self.id,
            # 'title': self.title,
            # 'img' : self.img,
            # 'video' : self.video,
            "media" : self.media,
            'body' : self.body,
            'user_id' : self.user_id,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
            'User' : {
                'id': self.user.id,
                'username' : self.user.username,
                'firstname' : self.user.first_name,
                'lastname' : self.user.last_name,
                'profile_picture' : self.user.profile_picture,
            },
            # 'likes' : [like.to_dict() for like in self.likes],
            'likes' : [{'id': like.id} for like in self.likes]
            # 'Comments' : [comment.to_dict() for comment in self.comments]
            # 'Medias' : [media.to_dict() for media in self.medias]
        }


