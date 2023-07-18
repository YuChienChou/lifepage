import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../store/post";
import { getUserPostsThunk } from "../../store/post";
import { getAllPostsThunk } from "../../store/post";
import { useModal } from '../../context/Modal';
import './editPost.css'


export default function DeletePostModal({sessionUser, post}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const deletePost = async () => {
        await dispatch(deletePostThunk(post.id));
        await dispatch(getUserPostsThunk(sessionUser.id));
        await dispatch(getAllPostsThunk());
        closeModal();
    };

    return (
        <>
        <div id='delete-comment-container'>
        
            <h3>Delete this post?</h3>

            <p>The post will be deleted permanently. Please confirm if you want to delete this post.</p>
            

            <div id='delete-comment-button-div'>
                <button id='cancel-delete'onClick={closeModal}>
                    Cancel
                </button>

                <button id='confirm-delete' onClick={deletePost}>
                    Delete
                </button>
            </div>

        </div>
        </>
    )
}

