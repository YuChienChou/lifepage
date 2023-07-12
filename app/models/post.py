from .db import db, environment, SCHEMA, add_prefix_for_prod

#joined table
posts_comments = db.Table(
    "posts_comments",
    db.Column("post_id", db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True),
    db.Column("comment_id", db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")), primary_key=True),
)


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    img = db.Column(db.String(255))
    video = db.Column(db.String(255))
    body = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship('Comment', cascade="delete, merge, save-update", back_populates="post")

    post_comments = db.relationship("Comment", secondary = "posts_comments", cascade="delete, merge, save-update", back_populates="post_comments")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'img' : self.img,
            'video' : self.video,
            'body' : self.body,
            'user_id' : self.user_id,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
            'User' : {
                'id': self.user.id,
                'username' : self.user.username,
                'firstname' : self.user.first_name,
                'lastname' : self.user.last_name,
            }
        }


