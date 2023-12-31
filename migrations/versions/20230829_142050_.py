"""empty message

Revision ID: 2e9e2b4a5f66
Revises: 
Create Date: 2023-08-29 14:20:50.482723

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '2e9e2b4a5f66'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=True),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.String(length=12), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('bio', sa.String(length=500), nullable=True),
    sa.Column('hobbies', sa.String(length=300), nullable=True),
    sa.Column('profile_picture', sa.String(length=255), nullable=True),
    sa.Column('cover_photo', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('follows',
    sa.Column('follower', sa.Integer(), nullable=False),
    sa.Column('followed', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followed'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower'], ['users.id'], ),
    sa.PrimaryKeyConstraint('follower', 'followed')
    )
    op.create_table('friends',
    sa.Column('friend', sa.Integer(), nullable=False),
    sa.Column('friend_added', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['friend'], ['users.id'], ),
    sa.ForeignKeyConstraint(['friend_added'], ['users.id'], ),
    sa.PrimaryKeyConstraint('friend', 'friend_added')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('media', sa.String(length=500), nullable=True),
    sa.Column('share_img', sa.String(length=250), nullable=True),
    sa.Column('share_video', sa.String(length=250), nullable=True),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('requests',
    sa.Column('request', sa.Integer(), nullable=False),
    sa.Column('requested', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['request'], ['users.id'], ),
    sa.ForeignKeyConstraint(['requested'], ['users.id'], ),
    sa.PrimaryKeyConstraint('request', 'requested')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=500), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_likes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'post_id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE posts SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_likes SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_likes')
    op.drop_table('comments')
    op.drop_table('requests')
    op.drop_table('posts')
    op.drop_table('friends')
    op.drop_table('follows')
    op.drop_table('users')
    # ### end Alembic commands ###
