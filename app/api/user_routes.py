from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import UserForm
from datetime import date
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

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


@user_routes.route('/current/info/edit', methods=["POST"])
@login_required
def edit_user_info():
    """
    Query for session user and update user information 
    and return the user as a dictionary.
    """
    # print("in the edit user route~~~~~~")
    try: 
        form = UserForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        form.user_id.data = current_user.id
        # print("current user id in edit user route: ", current_user.id)

        edit_user = User.query.get(current_user.id)

        # print("in the try block of the edit user route~~~~~~")

        if not edit_user:
            return "User not found", 404
        edit_user.username = form.data['username']
        edit_user.phone = form.data['phone']
        edit_user.bio = form.data['bio']
        edit_user.hobbies = form.data['hobbies']
        # edit_user.profile_picture = form.data['profile_picture']
        # edit_user.cover_photo = form.data['cover_photo']
        edit_user.updated_at = date.today()
        
        db.session.commit()
        # print("edited user in the edit user route: ", edit_user.to_dict())
        return edit_user.to_dict()

    except Exception as e:
        return {"errors" : str(e)}, 500
    

@user_routes.route('/current/profile_picture/edit', methods=["POST"])
@login_required
def edit_user_profile_picture():
    """
    Query for session user and update user information 
    and return the user as a dictionary.
    """
    # print("in the edit user route~~~~~~")
    try: 
        form = UserForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        edit_user = User.query.get(current_user.id)

        # print("in the try block of the edit user profile picture route~~~~~~")

        if not edit_user:
            return "User not found", 404
        
        new_profile_picture_url = ""

        new_profile_picture = form.data['profile_picture']
        # print("new profile picture form data: ", new_profile_picture)

        upload_profile_picture = None
        if new_profile_picture:
            new_profile_picture.filename = get_unique_filename(new_profile_picture.filename)
            upload_profile_picture = upload_file_to_s3(new_profile_picture)
            new_profile_picture_url = upload_profile_picture["url"]
            # print("uploaded profile picture in edit profile picture route: ", upload_profile_picture)

        if upload_profile_picture is not None and "url" not in upload_profile_picture:
            return f'{upload_profile_picture}'
        
        if edit_user.id == current_user.id:
            if edit_user.profile_picture: 
                remove_file_from_s3(edit_user.profile_picture)
            edit_user.username = form.data['username']
            edit_user.phone = form.data['phone']
            edit_user.bio = form.data['bio']
            edit_user.hobbies = form.data['hobbies']
            edit_user.profile_picture = new_profile_picture_url
            # edit_user.cover_photo = form.data['cover_photo']
            edit_user.updated_at = date.today()
            
            db.session.commit()
            # print("edited user in the edit user profile picture route: ", edit_user.to_dict())
            return edit_user.to_dict()

    except Exception as e:
        return {"errors" : str(e)}, 500
    
@user_routes.route('/current/cover_photo/edit', methods=["POST"])
@login_required
def edit_user_cover_photo():
    """
    Query for session user and update user cover_photo 
    and return the user as a dictionary.
    """
    # print("in the edit user route~~~~~~")
    try: 
        form = UserForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        form.user_id.data = current_user.id
        # print("current user id in edit user route: ", current_user.id)

        edit_user = User.query.get(current_user.id)

        # print("in the try block of the edit user route~~~~~~")

        if not edit_user:
            return "User not found", 404
        
        new_cover_photo_url = ""

        new_cover_photo = form.data['cover_photo']
        # print("new cover photo form data: ", new_cover_photo)

        upload_cover_photo = None
        if new_cover_photo:
            new_cover_photo.filename = get_unique_filename(new_cover_photo.filename)
            upload_cover_photo = upload_file_to_s3(new_cover_photo)
            new_cover_photo_url = upload_cover_photo["url"]
            # print("uploaded cover photo in edit profile picture route: ", upload_cover_photo)

        if upload_cover_photo is not None and "url" not in upload_cover_photo:
            return f'{upload_cover_photo}'
        
        if edit_user.id == current_user.id:
            if edit_user.cover_photo:
                remove_file_from_s3(edit_user.cover_photo)
            edit_user.username = form.data['username']
            edit_user.phone = form.data['phone']
            edit_user.bio = form.data['bio']
            edit_user.hobbies = form.data['hobbies']
            # edit_user.profile_picture = form.data['profile_picture']
            edit_user.cover_photo = new_cover_photo_url
            edit_user.updated_at = date.today()
            
            db.session.commit()
            # print("edited user in the edit user route: ", edit_user.to_dict())
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
            return "User not found.", 404
        
        if delete_user.id == current_user.id:
            db.session.delete(delete_user)
            db.session.commit()
            return "User account has been deleted."
        
    except Exception as e:
        return {"errors" : str(e)}, 500


@user_routes.route('/<int:user1_id>/follow/<int:user2_id>/add', methods=["POST"])
@login_required
def add_follow_rel(user1_id, user2_id):
    """
    query the user table and add the follow relationship,
    return the user who is followed by the current user
    in a dictionary
    """
    try: 
        user1 = User.query.get(user1_id) #current user
        user2 = User.query.get(user2_id) #the user that current user follows

        if not user1 or not user2:
            return "User not found.", 404

        user1.followed.append(user2)

        db.session.commit()
        db.session.refresh(user1)
        return user2.to_dict()
    
    except Exception as e:
        return {"error" : str(e)}, 500
    

@user_routes.route("/<int:userId>/following/all")
@login_required
def get_following_user_list(userId):
    """
    Get the user list the selected user follows
    """
    try:
        user = User.query.get(userId)

        if not user:
            return "User not found.", 404
        
        user_following = user.followed
        # print("user following list in the route: ", user_following)
        result = [user.to_dict() for user in user_following]
        return result
    
    except Exception as e:
        return {"errors" : str(e)}, 500
    

@user_routes.route('/<int:userId>/follower/all')
@login_required
def get_followed_user_list(userId):
    """
    Get the user list who follow the current user
    """
    try: 
        user = User.query.get(userId)

        if not user:
            return "User not found.", 404
        
        user_followers = user.followers
        result = [user.to_dict() for user in user_followers]
        return result
    
    except Exception as e:
        return {"errors" : str(e)}, 500
    

@user_routes.route('<int:user1_id>/follow/<int:user2_id>/delete', methods=["DELETE"])
@login_required
def delete_follow_rel(user1_id, user2_id):
    """
    Remove the following relationship between the current user
    and the selected user. 
    """
    try: 
        user1 = User.query.get(user1_id) #current user
        user2 = User.query.get(user2_id) #the user that the current user want to cancel follow relationship

        if not user1 or not user2:
            return "User not found.", 404
        
        user1.followed.remove(user2)
        db.session.commit()
        db.session.refresh(user1)

        return f"Cancel following relationship with {user2.first_name}."
    
    except Exception as e:
        return {"error" : str(e)}, 500


@user_routes.route('<int:user1_id>/friend/<int:user2_id>/add', methods=["POST"])
@login_required
def add_friend_rel(user1_id, user2_id):
    """
    query the user table and add the friend relationship, return the user 
    who is added as a friend by the current user as a dictionary.
    """
    try: 
        user1 = User.query.get(user1_id) #current user
        user2 = User.query.get(user2_id) #the user that current user adds as a friend

        if not user1 or not user2:
            return "User not found.", 404

        user1.friends.append(user2)
        user2.friends.append(user1)

        if user2 not in user1.followed: 
            user1.followed.append(user2) #when add a friend, automatically add the follow relationship

        if user1 not in user2.followed:
            user2.followed.append(user1)

        user1.requests.remove(user2) #when add a friend, automatically remove request from user2

        db.session.commit()
        db.session.refresh(user1)

        return user2.to_dict()
    
    except Exception as e:
        return {"error" : str(e)}, 500


@user_routes.route("<int:userId>/friend/all")
@login_required
def get_friend_list(userId):
    """
    Get the friends list of the current user
    """
    try:
        user = User.query.get(userId)

        if not user:
            return "User not found.", 404
        
        user_friends = user.friend_added
    
        result = [user.to_dict() for user in user_friends]
        return result
    
    except Exception as e:
        return {"errors" : str(e)}, 500
    

@user_routes.route('<int:user1_id>/friend/<int:user2_id>/delete', methods=["DELETE"])
@login_required
def delete_friend_rel(user1_id, user2_id):
    """
    Remove friend relationship between the current user and the selected user. 
    """
    try: 
        user1 = User.query.get(user1_id) #current user
        user2 = User.query.get(user2_id) #the user that the current user want to cancel friend relationship
        # print('user 2 in delete friend rel route: ', user2)

        if not user1 or not user2:
            return "User not found.", 404
        
        user1.friend_added.remove(user2)
        
        if user2 in user1.followed: 
            user1.followed.remove(user2) # when cancel friend rel, automatically cancel follow relationship
        db.session.refresh(user1)
        
        db.session.commit()
        # db.session.refresh(user1)
        return f'Cancel friend relationship with {user2.username}.'
    
    except Exception as e:
        return {"error" : str(e)}, 500
    


@user_routes.route('<int:user1_id>/request/<int:user2_id>/add', methods=["POST"])
@login_required
def add_request_rel(user1_id, user2_id):
    """
    query the user table and add the request relationship, return the user 
    who is requested for a friend rel by the current user as a dictionary.
    """
    try: 
        user1 = User.query.get(user1_id) #current user
        user2 = User.query.get(user2_id) #the user that current user adds as a friend

        if not user1 or not user2:
            return "User not found.", 404

        user2.requests.append(user1)
        db.session.commit()
        db.session.refresh(user1)
        db.session.refresh(user2)

        return user2.to_dict()
    
    except Exception as e:
        return {"error" : str(e)}, 500
    

@user_routes.route("<int:userId>/request/all")
@login_required
def get_request_list(userId):
    """
    Get the add friend request list of the current user
    """
    try:
        user = User.query.get(userId)

        if not user:
            return "User not found.", 404
        
        user_requests = user.requests
    
        result = [user.to_dict() for user in user_requests]
        return result
    
    except Exception as e:
        return {"errors" : str(e)}, 500


@user_routes.route('<int:user1_id>/request/<int:user2_id>/delete', methods=["DELETE"])
@login_required
def delete_request_rel(user1_id, user2_id):
    """
    Remove add friend request relationship between the current user and the selected user. 
    """
    try: 
        user1 = User.query.get(user1_id) #current user
        user2 = User.query.get(user2_id) #the user that the current user want to cancel friend relationship
        # print('user 2 in delete friend rel route: ', user2)

        if not user1 or not user2:
            return "User not found.", 404
        
        # user2.requested.remove(user1)
        user1.requests.remove(user2)
        # user2.requests.remove(user1)
        # if user2 in user1.requested: 
        #     user1.requested.remove(user2) # when cancel friend rel, automatically cancel follow relationship
        db.session.commit()
        db.session.refresh(user1)
        db.session.refresh(user2)
        return f'Declined add friend request from {user2.username}.'
    
    except Exception as e:
        return {"error" : str(e)}, 500
    