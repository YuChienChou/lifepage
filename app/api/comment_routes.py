from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm
from datetime import date

comment_route = Blueprint('comments', __name__)
print(__name__)

#Edit a comment 
@comment_route.route('/<int:commentId>/edit', methods=["POST"])
@login_required
def edit_comment(commentId):
    # print("in the edit comment route~~~~~")
    try:
        edit_comment = Comment.query.get(commentId)

        if not edit_comment:
            return "Comment not found.", 404
        
        form =CommentForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if edit_comment.user.id == current_user.id:
            edit_comment.content = form.data['content']
            edit_comment.post_id = form.data['post_id']
            edit_comment.user_id = form.data['user_id']
            edit_comment.updated_at = date.today()
            
            db.session.commit()
            return edit_comment.to_dict()
        
    except Exception as e:
        return {"error": str(e)}, 500
    

#delete a comment
@comment_route.route('/<int:commentId>/delete', methods=["DELETE"])
@login_required
def delete_comment(commentId):

    try:
        delete_comment = Comment.query.get(commentId)

        if not delete_comment:
            return "Comment not found.", 404
        
        if delete_comment.user.id == current_user.id:
            db.session.delete(delete_comment)
            db.session.commit()
            return "Your comment has been deleted."
        
    except Exception as e:
        return {"error": str(e)}, 500

