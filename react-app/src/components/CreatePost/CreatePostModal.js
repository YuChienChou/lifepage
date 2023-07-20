import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPostThunk, getUserPostsThunk } from "../../store/post";
import { getSingleUserThunk } from "../../store/user";
import { useModal } from "../../context/Modal";
import userProfilePicture from '../resources/default-user-profile-picture.png';
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
            await dispatch(createPostThunk(sessionUser.id, postInfo));
            await dispatch(getSingleUserThunk(sessionUser.id));
            await dispatch(getUserPostsThunk(sessionUser.id));
            closeModal()
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const errors = {}
        if(!body) errors.body = "please enter your post";
        if(body.length > 3000) errors.bodylength = "Please enter content less than 3000 characters.";
        if(img && !img.endsWith('.jpg') && !img.endsWith('.png') && !img.endsWith('.jpeg')) errors.imgFormat = "Image URL needs to end in png or jpg (or jpeg)";
        if(video) {
            const videoFrag = video.split("=");
            if(!videoFrag[0].includes("https://www.youtube.com/"))  errors.videoFormat = "Please enter valid URL form YouTube."}

        setValidationError(errors)
    }, [body, img, video]);

    return (
        <>
        <div id='create-post-title'>
            <h3>Create Post</h3>
        </div>
        <div id='create-post-user'>
           <Link to={`/user/${sessionUser.id}/posts`}><img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
            alt={sessionUser.first_name}/></Link>
            <Link to={`/user/${sessionUser.id}/posts`}>{sessionUser.first_name} {sessionUser.last_name}</Link>
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
                                placeholder="Please provide img url ends with png, jpg, or jpeg."/>
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
                                placeholder="Please provide valid url from YouTube."/>
                        </div>
                    : null
                }
                {validationError.imgFormat ? 
                <div id='error-div'>
                    {validationError.imgFormat && <p>{validationError.imgFormat}</p>}
                </div>
                : null
                }
                {validationError.videoFormat ? 
                <div id='error-div'>
                    {validationError.videoFormat && <p>{validationError.videoFormat}</p>}
                </div>
                : null
                }
                {/* <div id='error-div'>
                    {validationError.imgFormat && <p>{validationError.imgFormat}</p>}
                    {validationError.videoFormat && <p>{validationError.videoFormat}</p>}
                </div> */}

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