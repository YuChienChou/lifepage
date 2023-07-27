from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment
from app.forms import PostForm
from app.forms import CommentForm
from datetime import date

post_route = Blueprint('posts', __name__)
print(__name__)



#get all posts when a user is logged in
@post_route.route('/', methods=["GET"])
@login_required
def get_all_posts():
    # print("in the get all posts route~~~~~~~~~~")
    posts = Post.query.all()
    return [post.to_dict() for post in posts]
    

#test post form
@post_route.route('/new', methods=["GET"])
@login_required
def posts_form():
    form=PostForm()
    return render_template('post_form.html', form=form)


#create a new post
@post_route.route('/<int:userId>/new', methods=['POST'])
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
                # title = form.data['title'],
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
@post_route.route('/<int:postId>/edit', methods=["POST"])
@login_required
def edit_post(postId):

    try: 
        # print("In the edit post route!!!!!!!!")
        form = PostForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        # userId = current_user.id
        form.user_id.data = current_user.id

        edit_post = Post.query.get(postId)
        if not edit_post:
            return "Post not found.", 404
        # print("edit_post in the edit post route: ", edit_post.to_dict())
   
        if edit_post.user.id == current_user.id:
            edit_post.title = form.data['title']
            edit_post.img = form.data['img']
            edit_post.video = form.data['video']
            edit_post.body = form.data['body']
            edit_post.updated_at = date.today()
            db.session.commit()
            # print("edited post in the edit post route: ", edit_post.to_dict())
            return edit_post.to_dict()

    
    except Exception as e: 
        return {"error" : str(e)}, 500
    

#delete a post 
@post_route.route('/<int:postId>/delete', methods=["DELETE"])
@login_required
def delete_post(postId):

    try:
        delete_post = Post.query.get(postId)

        if not delete_post:
            return "Post not found.", 404

        if delete_post.user.id == current_user.id:
            db.session.delete(delete_post)
            db.session.commit()
            return "Your post has been deleted."
    
    except Exception as e:
        return {"error" : str(e)}, 500
    

#get all post of current user 
@post_route.route('/<int:userId>/all', methods=["GET"])
@login_required
def get_current_user_post(userId):

    try: 
        user_posts = Post.query.filter(Post.user_id == userId).all()
        return [post.to_dict() for post in user_posts]
    
    except Exception as e:
        return {"error" : str(e)}, 500


#get a post by post id
@post_route.route('/<int:postId>', methods=["GET"])
@login_required
def get_single_post(postId):
    
    try: 
        single_post = Post.query.get(postId)
        if single_post:
            return single_post.to_dict()
        else:
            return "Post not found."
    
    except Exception as e:
        return {"error" : str(e)}, 500


#post a comment for a post
@post_route.route('/<int:postId>/comments/new', methods=["POST"])
@login_required
def create_comment(postId):
    # print("in the create comment route~~~~~~~~~~~~~~~~~~")
    try: 
        post = Post.query.get(postId)

        if not post:
            return "Post not found.", 404
        
        form = CommentForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        # print("form data in create comment route: ", form.data)

        if form.validate_on_submit():
            # print("in the if statement of the create comment route!!")
            new_comment = Comment(
                content = form.data['content'],
                post_id = form.data['post_id'],
                user_id = form.data['user_id'],
                created_at = date.today(),
                updated_at = date.today(),
            )

            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict()
    
    except Exception as e:
        return {"error": str(e)}, 500
    

@post_route.route('/user_likes', methods=["POST"])
@login_required
def add_like_to_post():
    """
    query the current user and the post and add them to user_likes table 
    when the user likes a post
    """

    # print("in the add user like route~~~~~~~~~~~~")
    try: 
        user_id = request.json.get("user_id")
        post_id = request.json.get("post_id")

        user = User.query.get(user_id)
        post = Post.query.get(post_id)

        if not user or not post: 
            return "User or post not found.", 404
    
        # print("join table in the route: ", user.likes)
        user.likes.append(post)
        db.session.commit()
        return post.to_dict()
    
    except Exception as e:
        return{"error" : str(e)}, 500

    

@post_route.route('/<int:userId>/likes', methods=["GET"])
@login_required
def get_all_like_posts(userId):
    """
    Query user_likes table and return the list of posts which
    are liked by current user
    """

    try: 
        user = User.query.get(userId)

        if not user: 
            return "User not found.", 404
    
        like_posts = user.likes
        # print("like_post in the post route: ", like_posts)
        result = [post.to_dict() for post in like_posts]
        # print("result in get user like posts route: ", result)

        return result
        
    except Exception as e:
        return {"error" : str(e)}, 500
 

@post_route.route('/<int:postId>/likes/delete', methods=["DELETE"])
@login_required
def delete_like_from_post(postId):
    """
    Query the post in user_likes table and cancel like relationship. 
    """
    try:
        user = current_user
        post = Post.query.get(postId)

        if not user or not post:
            return "User or post not found.", 404
        
        user.likes.remove(post)
        db.session.commit()
        return "Remove post from user_likes table with current user."
    
    except Exception as e:
        return {"error" : str(e)}, 500
    




        


        

