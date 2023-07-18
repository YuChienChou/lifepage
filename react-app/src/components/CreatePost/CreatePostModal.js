import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPostThunk, getUserPostsThunk } from "../../store/post";
import { getSingleUserThunk } from "../../store/user";
import { useModal } from "../../context/Modal";
import './createpost.css'


export default function CreatePost({sessionUser}) {
    // const [title, setTitle] = useState("")
    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");
    const [body, setBody] = useState("");
    const [validationError, setValidationError] = useState({});
    const [showItem, setShowItem] = useState(false)
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const showItemFun = () => {
        setShowItem(!showItem)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = {
            // title,
            img,
            video,
            body,
            user_id: sessionUser.id,
        }

        try {
            await dispatch(createPostThunk(sessionUser.id, postInfo))
            await dispatch(getSingleUserThunk(sessionUser.id))
            await dispatch(getUserPostsThunk(sessionUser.id))
            closeModal()
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const errors = {}
        if(!body) errors.body = "please enter your post";
        if(body.length > 3000) errors.bodylength = "Please enter content less than 3000 characters.";

        setValidationError(errors)
    }, [body]);

    return (
        <>
        <div id='create-post-title'>
            <h3>Create Post</h3>
        </div>
        <div id='create-post-user'>
           <Link to={`/user/${sessionUser.id}`}><img src={sessionUser.profile_picture ? sessionUser.profile_picture : "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80"} 
            alt={sessionUser.first_name}/></Link>
            <Link to={`/user/${sessionUser.id}`}>{sessionUser.first_name} {sessionUser.last_name}</Link>
        </div>
       
        <form id='create-post-form' onSubmit={handleSubmit}>
                {/* <input
                    type='text' 
                    placeholder="Title for your post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /> */}
                <textarea 
                    type='text'
                    placeholder={`What's on your mind, ${sessionUser.first_name}?`}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                /> 
                
                <div id='error-div'>
                    {validationError.bodylength && <p>{validationError.bodylength}</p>}
                </div>
    
                {showItem ? 
                        <div id='add-image-div'>
                            <i className="fa-solid fa-photo-film"></i>
                            <textarea 
                                type='text'
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                placeholder="Please provide img url."/>
                        </div>
                    : null
                }

                {showItem ? 
                        <div id='add-video-div'>
                            <i className="fa-solid fa-video"></i>
                            <textarea 
                                type='text'
                                value={video}k
                                onChange={(e) => setVideo(e.target.value)}
                                placeholder="Please provide video url."/>
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
                        id={Object.values(validationError).length > 0 ? 'create-post-button-disabled' : 'create-post-button-active'}
                    >
                        Post
                    </button>
         
        </form>

        </>
    )
}