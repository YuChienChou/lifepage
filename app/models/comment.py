from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    user = db.relationship(
        "User", 
        back_populates="comments"
    )

    post = db.relationship(
        "Post", 
        back_populates="comments"
    )

    # post_comments = db.relationship("Post", secondary="posts_comments", back_populates="post_comments")

    def to_dict(self):
        return {
            'id' : self.id,
            'content' : self.content,
            'post_id' : self.post_id,
            'user_id' : self.user_id,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
            'User' : {
                'id': self.user.id,
                'username' : self.user.username,
                'first_name' : self.user.first_name,
                'last_name' : self.user.last_name,
                'profile_picture' : self.user.profile_picture,
            }
        }