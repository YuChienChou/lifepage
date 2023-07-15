from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from datetime import date


class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    created_at = date.today()
    updated_at = date.today()
    submit = SubmitField('submit')
    