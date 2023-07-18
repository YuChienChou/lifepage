import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPostThunk } from '../../store/post';
import { useModal } from '../../context/Modal';
import { getAllPostsThunk, getUserPostsThunk } from '../../store/post';
import { getSingleUserThunk } from '../../store/user';
import './editPost.css'

export default function EditPostModal({sessionUser, post }) {
    // console.log("post in editpostmodal: ", post);
    // const [title, setTitle] = useState(post.title);
    const [img, setImg] = useState(post.img);
    const [video, setVideo] = useState(post.video);
    const [body, setBody] = useState(post.body);
    const [validationError, setValidationError] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const [showItem, setShowItem] = useState(false)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const showItemFun = () => {
        setShowItem(!showItem)
    }

    const EditPost = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = {
            // title, 
            img, 
            video,
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
            <div id='edit-post-title'>
                <h3>Edit Post</h3>
            </div>
            <div id='edit-post-user'>
                <img src={sessionUser.profile_picture} alt={sessionUser.first_name}/>
                <p>{sessionUser.first_name} {sessionUser.last_name}</p>
            </div>
            <form id='edit-post-form' onSubmit={EditPost}>
                
                    {/* <input
                        type='text' 
                        // placeholder="Title for your post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /> */}
                    <textarea 
                        // placeholder={`What's on your mind, ${sessionUser.first_name}`}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                

                 
                    {showItem? 
                        <div id='edit-image-div'>
                            <i className="fa-solid fa-photo-film"></i>
                            <textarea 
                                type='text'
                                value={post.img ? img : "Please provide the image URL."}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div> 
                        : null
                    }
                 
            
                    {showItem ? 
                        <div id='edit-video-div'>
                            <i className="fa-solid fa-video"></i>
                            <textarea 
                                type='text'
                                value={post.video ? video : "Please provide the video URL."}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </div>
                        : null
                    }
                

                    <div id='create-post-button-div'>
                        <div onClick={showItemFun}>
                            Add to your post
                        </div>
                        <div id='img-video'>
                            <i className="fa-solid fa-photo-film" onClick={showItemFun}></i>
                            <i className="fa-solid fa-video" onClick={showItemFun}></i>
                        </div>
                    
                    </div>
                    <button 
                        type='submit'
                        disabled={Object.values(validationError).length > 0}
                        id={Object.values(validationError).length > 0 ? 'edit-post-button-disabled' : 'edit-post-button-active'}
                    >
                        Save
                    </button>
                
            </form>
        </div>
        </>
    )
}