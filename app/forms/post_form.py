from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError  
from datetime import date
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class MaxFileSize(object):
    def __init__(self, max_size):
        self.max_size = max_size

    def __call__(self, form, field):
        if field.data and field.data.content_length > self.max_size:
            raise ValidationError('File size exceeds the allowed limit.')


class PostForm(FlaskForm):
    # title = StringField('title')
    media = FileField("media", validators=[FileAllowed(list(ALLOWED_EXTENSIONS)),  MaxFileSize(max_size=110 * 1024 * 1024)])
    body = TextAreaField('body', validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
    created_at = date.today()
    updated_at = date.today()
    submit = SubmitField('submit')