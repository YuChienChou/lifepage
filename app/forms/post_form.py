from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from datetime import date


class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    img = StringField('img')
    video = StringField('video')
    body = TextAreaField('body')
    user_id = IntegerField('user id')
    created_at = date.today()
    updated_at = date.today()
    submit = SubmitField('submit')