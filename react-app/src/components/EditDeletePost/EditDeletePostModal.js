import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletePostThunk, getAllPostsThunk} from '../../store/post';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import EditPostModal from './EditPostModal';



export default function EditDeletePostModal({sessionUser, post}) {
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("");
    const [body, setBody] = useState("");
    const [validationError, setValidationError] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const closeModalAndRefresh = () => {
        closeModal();
        dispatch(getAllPostsThunk());
      };

    const deletePost = async (e) => {
        await dispatch(deletePostThunk(post.id))
        .then(closeModal())
    };


    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])


    return (
        <>
        <div id='edit-delete-post-container'>
            <div di='edit-post'>
                <i className="fa-solid fa-pen"></i>
                <p>Edit post</p>
                <OpenModalButton
                    buttonText="Edit post"
                    modalComponent={<EditPostModal sessionUser={sessionUser} post={post} closeModalAndRefresh={closeModalAndRefresh}/>}
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