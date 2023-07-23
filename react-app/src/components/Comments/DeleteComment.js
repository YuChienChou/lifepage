import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../store/comment";
import './comment.css';

export default function DeleteComment({ comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteComment = async () => {
        await dispatch(deleteCommentThunk(comment.id));
        
        closeModal();
    };

    return (
        <>
        <div id='delete-post-container'>
        
            <h3>Delete this Comment?</h3>

            <p>Are you sure you want to delete this comment?</p>
            

            <div id='delete-post-button-div'>
                <button id='cancel-delete'onClick={closeModal}>
                    Cancel
                </button>

                <button id='confirm-delete' onClick={deleteComment}>
                    Delete
                </button>
            </div>

        </div>
        </>
    )
}