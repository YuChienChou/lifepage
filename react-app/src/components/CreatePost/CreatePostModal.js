import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { createPostThunk, getUserPostsThunk } from "../../store/post";
import { getSingleUserThunk } from "../../store/user";
import { useModal } from "../../context/Modal";
import './createpost.css'


export default function CreatePost({sessionUser}) {
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");
    const [body, setBody] = useState("");
    const [validationError, setValidationError] = useState({});
    const [showImgArea, setShowImgArea] = useState(false);
    const [showVideoArea, setShowVideoArea] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const showImgAreaFun = () => {
        setShowImgArea(!showImgArea)
    }

    const showVideoAreaFun = () => {
        setShowVideoArea(!showVideoArea)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = {
            title,
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
        if(body.length > 2000) errors.body = "Please enter content less than 2000 characters.";

        setValidationError(errors)
    }, [body]);

    return (
        <>
        <div id='create-post-title'>
            <h3>Create Post</h3>
        </div>
        <div id='create-post-user'>
            <img src={sessionUser.profile_picture} alt={sessionUser.first_name}/>
            <p>{sessionUser.first_name} {sessionUser.last_name}</p>
        </div>
        <div id='error-div'>
            {hasSubmit && <p>{validationError.body}</p>}
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

                {showImgArea ? 
                        <div id='add-image-div'>
                            <input 
                                type='text'
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                placeholder="Please provide img url."/>
                        </div>
                    : null
                }

                {showVideoArea ? 
                        <div id='add-video-div'>
                            <input 
                                type='text'
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
                                placeholder="Please provide video url."/>
                        </div>
                    : null
                }

                <div id='create-post-button-div'>
                    <button 
                        type='submit'
                        disabled={Object.values(validationError).length > 0}
                    >
                        Add to your post
                    </button>
                    <div id='img-video'>
                        <i className="fa-solid fa-photo-film" onClick={showImgAreaFun}></i>
                        <i className="fa-solid fa-video" onClick={showVideoAreaFun}></i>
                    </div>
                    
                </div>
         
        </form>

        </>
    )
}