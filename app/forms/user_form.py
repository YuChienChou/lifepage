from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from datetime import date
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class UserForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    username = StringField('username', validators=[Length(min=0, max=50, message='Please input username within 50 characters.')])
    phone = StringField('phone', validators=[Length(min= 0, max=12, message='Please input valid phone number')])
    bio = StringField('bio', validators=[Length(min= 0, max=500, message='Please enter your bio within 500 characters.')])
    hobbies = StringField('hobbies', validators=[Length(min= 0, max=300, message='Please enter your bio within 500 characters.')])
    # profile_picture = StringField('profile_picture', validators=[Length(min= 0, max=255, message='Profile picture URL has to be within 255 characters.')])
    # cover_photo = StringField('cover_photo', validators=[Length(min= 0, max=255, message='Cover photo URL has to be within 255 characters.')])
    profile_picture = FileField('profile_picture', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    cover_photo = FileField('cover_photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    updated_at = date.today()