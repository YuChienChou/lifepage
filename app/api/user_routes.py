from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import UserForm
from datetime import date

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    # print([user.to_dict() for user in users])
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/current')
@login_required
def get_current_user():
    """
    Query for session user and returns that user in a dictionary
    """
    user = current_user
    return user.to_dict()

@user_routes.route('/<int:userId>/edit', methods=["POST"])
@login_required
def edit_user(userId):
    """
    Query for session user and update user information 
    and return the user as a dictionary.
    """

    try: 
        form = UserForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        form.user_id.data = current_user.id

        edit_user = User.query.get(userId)

        if not edit_user:
            return "User not found", 404
        
        if edit_user.id == current_user.id:
            edit_user.phone = form.data['phone']
            edit_user.bio = form.data['bio']
            edit_user.hobbies = form.data['hobbies']
            edit_user.profile_picture = form.data['profile_picture']
            edit_user.cover_photo = form.data['cover_photo']
            edit_user.updated_at = date.today()
            
            db.session.commit()
            return edit_user.to_dict()

    except Exception as e:
        return {"errors" : str(e)}, 500


@user_routes.route('/<int:userId>/delete', methods=["DELETE"])
@login_required
def delete_user(userId):
    """
    Query for session user and delete the user account.
    """

    try:
        delete_user = User.query.get(userId)

        if not delete_user:
            return "User not found", 404
        
        if delete_user.id == current_user.id:
            db.session.delete(delete_user)
            db.session.commit()
            return "User account has been deleted."
        
    except Exception as e:
        return {"errors" : str(e)}, 500


    