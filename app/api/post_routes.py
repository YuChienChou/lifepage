from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm
from datetime import date

post_route = Blueprint('posts', __name__)
print(__name__)



#get all posts when a user is logged in
@post_route.route('/', methods=["GET"])
@login_required
def get_all_posts():
    print("in the get all posts route~~~~~~~~~~")
    posts = Post.query.all()
    return [post.to_dict() for post in posts]
    

#test post form
@post_route.route('/new', methods=["GET"])
@login_required
def posts_form():
    form=PostForm()
    return render_template('post_form.html', form=form)


#create a new post
@post_route.route('/<int:userId>/posts', methods=['POST'])
@login_required
def create_post(userId): 
    # print("in the create post route!!!")
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    userId = current_user.id
    form.user_id.data = userId
    # print("current user Id in create post route: ", current_user.id)
    # print("userId in create post route: ", userId)
    # print("form data in create post routen ", form.data)
    # print("user id in the form data: ", form.data['user_id'])
    try: 
        if form.validate_on_submit:
            new_post = Post(
                title = form.data['title'],
                img = form.data['img'],
                video = form.data['video'],
                body = form.data['body'],
                user_id = form.data['user_id'],
                created_at = date.today(),
                updated_at = date.today(),
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
    except Exception as e:
        return {"error" : str(e)}, 500
    

#update a post
@post_route.route('<int:userId>/posts/<int:postId>', methods=["POST"])
@login_required
def edit_post(userId, postId):
    # print("In the edit post route!!!!!!!!")
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    userId = current_user.id
    form.user_id.data = userId

    edit_post = Post.query.get(postId)
    # print("edit_post in the edit post route: ", edit_post.to_dict())
    try: 

        if edit_post.user.id == userId:
            edit_post.title = form.data['title']
            edit_post.img = form.data['img']
            edit_post.video = form.data['video']
            edit_post.body = form.data['body']
            db.session.commit()
            return edit_post.to_dict()
    
    except Exception as e: 
        return {"error" : str(e)}, 500
    

#delete a post 
@post_route.route('/<int:postId>/delete', methods=["DELETE"])
@login_required
def delete_post(postId):

    delete_post = Post.query.get(postId)

    try:
        if delete_post.user.id == current_user.id:
            db.session.delete(delete_post)
            db.session.commit()
            return "Your post has been deleted."
    
    except Exception as e:
        return {"error" : str(e)}, 500




        
