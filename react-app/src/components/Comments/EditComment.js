import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { editCommentThunk } from "../../store/comment";
import { getAllPostsThunk, getUserPostsThunk } from "../../store/post";



export default function EditComment({sessionUser, post, comment}) {
    // console.log("comment in edit comment component: ", comment)
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
            await dispatch(getAllPostsThunk());
            await dispatch(getUserPostsThunk(sessionUser.id))
            closeModal()
        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => {
        const errors = {};
        if(!content) errors.content = "Please enter your comment";

        setValidationErrors(errors)

    }, [content]);

    return (
        <>
        <div id='delete-comment-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={Object.values(validationErrors).length > 0}
                >
                    Save
                </button>
            </form>
        </div>
        </>
    );
};