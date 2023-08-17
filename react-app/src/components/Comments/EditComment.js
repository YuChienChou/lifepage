import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { editCommentThunk, getAllCommentsThunk } from "../../store/comment";
import { getAllPostsThunk } from "../../store/post";
import './EditComment.css';


export default function EditComment({sessionUser, post, comment}) {
    const [content, setContent] = useState(comment.content);
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentInfo = {
            content,
            user_id : sessionUser.id,
            post_id : post.id
        }

        try {
            await dispatch(editCommentThunk(comment.id, commentInfo));
            // await dispatch(getAllPostsThunk(post.id));
            
            closeModal()
        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => {
        const errors = {};
        if(!content) errors.content = "Please enter your comment";
        if(content.length > 500) errors.contentlength = "Please enter your comment less than 500 character."

        setValidationErrors(errors)

    }, [content]);

    return (
        <>
        <div id='edit-comment-container'>
            <h3>Edit Comment</h3>
            <form id='edit-comment-form' onSubmit={handleSubmit}>
            
                <textarea
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div id='error-div'>
                    {validationErrors.contentlength && <p>{validationErrors.contentlength}</p> }
                </div>

                <button
                    type="submit"
                    disabled={Object.values(validationErrors).length > 0}
                    id={Object.values(validationErrors).length > 0 ? 
                        'edit-comment-button-disabled' : 'edit-comment-button-active'
                    }
                >
                    Save
                </button>
            </form>
        </div>
        </>
    );
};