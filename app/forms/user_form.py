from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length
from datetime import date


class UserForm(FlaskForm):
    phone = StringField('phone', validators=[Length(min= 0, max=10, message='Please input valid phone number')])
    bio = StringField('bio', validators=[Length(min= 0, max=1000, message='Please enter your bio within 1000 characters.')])
    hobbies = StringField('hobbies', validators=[Length(min= 0, max=500, message='Please enter your bio within 500 characters.')])
    profile_picture = StringField('profile_picture', validators=[Length(min= 0, max=255, message='Profile picture URL has to be within 255 characters.')])
    cover_photo = StringField('cover_photo', validators=[Length(min= 0, max=255, message='Cover photo URL has to be within 255 characters.')])
    updated_at = date.today()