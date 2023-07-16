import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPostThunk } from '../../store/post';
import { useModal } from '../../context/Modal';
import { getAllPostsThunk, getUserPostsThunk } from '../../store/post';
import { getSingleUserThunk } from '../../store/user';

export default function EditPostModal({sessionUser, post }) {
    // console.log("post in editpostmodal: ", post);
    const [title, setTitle] = useState(post.title)
    const [img, setImg] = useState(post.img);
    const [body, setBody] = useState(post.body);
    const [validationError, setValidationError] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const EditPost = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = {
            title, 
            img, 
            body,
            user_id : sessionUser.id
        }
        
        try {
            await dispatch(editPostThunk(post.id, postInfo))
            await dispatch(getUserPostsThunk(sessionUser.id))
            await dispatch(getAllPostsThunk())
            await dispatch(getSingleUserThunk(sessionUser.id))
            
            closeModal();
        } catch(error) {
            console.log(error);
        };
    };


    useEffect(() => {
        const errors = {};
        if(!body) errors.body = "Please enter your post.";
        if(body.length > 2000) errors.body = errors.body = "Please enter content less than 2000 characters.";

        setValidationError(errors)
    }, [body])

    return (
        <>
        <div id='edit-post-container'>
            <form onSubmit={EditPost}>
                <div>
                    <input
                        type='text' 
                        // placeholder="Title for your post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                        // placeholder={`What's on your mind, ${sessionUser.first_name}`}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                 
                <div>
                    <i className="fa-solid fa-photo-film"></i>
                    <input 
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        // placeholder="Please provide img url."
                    />
                </div>

                <div>
                    <button 
                        type='submit'
                        disabled={Object.values(validationError).length > 0}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}