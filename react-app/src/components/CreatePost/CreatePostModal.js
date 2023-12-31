import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPostThunk, getAllPostsThunk } from "../../store/post";
import { getUserPostsThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import { getSingleUserThunk } from "../../store/user"
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './createpost.css'


export default function CreatePost({sessionUser}) {
    const [media, setMedia] = useState("");
    const [body, setBody] = useState("");
    const [shareImg, setShareImg] = useState("");
    const [shareVideo, setShareVideo] = useState("")
    const [validationError, setValidationError] = useState({});
    const [showItem, setShowItem] = useState(false)
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const showItemFun = () => {
        setShowItem(!showItem)
    }

    const handleMediaChange = (e) => {
        const selectedMedia = e.target.files[0];

        if (selectedMedia) {
            const fileSizeInKB = selectedMedia.size;
            if (fileSizeInKB > 110 * 1024 * 1024) {
                setValidationError({ ...validationError, mediaSize: "Please provide a file size under 100MB." });
            } else {
                setValidationError({ ...validationError, mediaSize: "" });
                setMedia(selectedMedia);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = new FormData();
        postInfo.append("media", media);
        postInfo.append("body", body);
        postInfo.append("user_id", sessionUser.id);
        postInfo.append("share_img", shareImg);
        postInfo.append("share_video", shareVideo)
    
        await dispatch(createPostThunk(sessionUser.id, postInfo));
        // await dispatch(getSingleUserThunk(sessionUser.id));
        await dispatch(getUserPostsThunk(sessionUser.id));
        await dispatch(getAllPostsThunk());
        
        closeModal()
    };

    useEffect(() => {
        const errors = {}
        if(!body) errors.body = "please enter your post";
        if(body.length > 3000) errors.bodylength = "Please enter content less than 3000 characters.";
       
       
        if(media) {
            if(!media['name'].endsWith("pdf") && 
               !media['name'].endsWith("png") &&
               !media['name'].endsWith("jpg") &&
               !media['name'].endsWith("jpeg") && 
               !media['name'].endsWith("gif") &&
               !media['name'].endsWith("mp4") && 
               !media['name'].endsWith("avi") && 
               !media['name'].endsWith("mov") &&
               !media['name'].endsWith("mkv"))  
               errors.mediaFormat = "Please provide valid image or video file ends with pdf, png, jpg, gif, mp4, avi, mov, or mkv."}
        
        if(shareImg) {
            if(
                !shareImg.endsWith('.jpg') && 
                !shareImg.endsWith('.png') && 
                !shareImg.endsWith('.jpeg'))
                errors.shareImgFormat = "Image URL needs to end in png or jpg (or jpeg)."} 

         if(shareVideo) {
            const videoFrag = shareVideo.split("=");
            if(!videoFrag[0].includes("https://www.youtube.com/"))  errors.shareVideoFormat = "Please enter valid URL form YouTube."}

        setValidationError(errors)
    }, [body, media, shareImg, shareVideo]);

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

        {hasSubmit ? 
                    <div id="animationDiv" className="animation-container">
                        <div className="loading-spinner"></div>
                        <p>Uploading...</p>
                    </div>
                    :
                    null
                }
       
        <form id='create-post-form' onSubmit={handleSubmit} encType="multipart/form-data">
                <textarea 
                    type='text'
                    placeholder={`What's on your mind, ${sessionUser.username? sessionUser.username : sessionUser.first_name}?`}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                /> 
                
                <div id='error-div'>
                    {validationError.bodylength && <p>{validationError.bodylength}</p>}
                </div>
    
                {showItem ? 
                    <>
                        <div id='add-image-div'>
                            
                            <div>
                                <i className="fa-solid fa-photo-film"></i>
                                <input
                                    type="file"
                                    // onChange={(e) => setMedia(e.target.files[0])}
                                    onChange={handleMediaChange}
                                    />
                            </div>
                            <p>Please provide a file size under 100MB or you can share an image/video by providing a valid URL.</p>

                            <input 
                            type='text'
                            value={shareImg}
                            placeholder="Please enter an image URL."
                            onChange={(e) => setShareImg(e.target.value)}
                            />
                            <input 
                            type='text'
                            value={shareVideo}
                            placeholder="Please enter an video URL."
                            onChange={(e) => setShareVideo(e.target.value)}
                            />
                        </div>
                        <div id='error-div'>
                            {validationError.shareImgFormat && <p>{validationError.shareImgFormat}</p>}
                            {validationError.shareVideoFormat && <p>{validationError.shareVideoFormat}</p>}
                        </div>

                    </>
                    : null
                }
                {validationError.mediaSize ?
                    <div id='error-div'>
                        <p>{validationError.mediaSize}</p>
                    </div>
                    : null
                }

                {validationError.mediaFormat ? 
                <div id='error-div'>
                    {validationError.mediaFormat && <p>{validationError.mediaFormat}</p>}
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