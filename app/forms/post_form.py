from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from datetime import date
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    # title = StringField('title')
    media = FileField("media", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    body = TextAreaField('body', validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
    created_at = date.today()
    updated_at = date.today()
    submit = SubmitField('submit')