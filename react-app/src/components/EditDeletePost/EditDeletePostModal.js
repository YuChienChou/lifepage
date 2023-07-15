import { useDispatch } from 'react-redux';
import { deletePostThunk, getAllPostsThunk, getUserPostsThunk} from '../../store/post';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import EditPostModal from './EditPostModal';
import { getSingleUserThunk } from '../../store/user';



export default function EditDeletePostModal({sessionUser, post}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deletePost = async () => {
        await dispatch(deletePostThunk(post.id))
        await dispatch(getUserPostsThunk(sessionUser.id))
        closeModal()
    };

    return (
        <>
        <div id='edit-delete-post-container'>
            <div di='edit-post'>
                <i className="fa-solid fa-pen"></i>
                <p>Edit post</p>
                <OpenModalButton
                    buttonText="Edit post"
                    modalComponent={<EditPostModal sessionUser={sessionUser} post={post}/>}
                />

                <form id='edit-post-form'>

                </form>
            </div>
            <div id='delete-post'>
                <i className="fa-regular fa-trash-can" onClick={deletePost}></i>
                <p>Move to trash</p>
            </div>
        </div>
        </>
    )    
}