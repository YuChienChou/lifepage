import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { editPostThunk, editSinglePostThunk, getAllPostsThunk, getUserPostsThunk } from '../../store/post';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './editPost.css'

export default function EditPostModal({sessionUser, post }) {
    const [media, setMedia] = useState("");
    // console.log("post media in editPostModal: ", post.media)
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

        if(media) {
            const postInfo = new FormData();
            postInfo.append("media", media);
            postInfo.append("body", body);
            postInfo.append("user_id", sessionUser.id);
            
            try {
                await dispatch(editPostThunk(post.id, postInfo)) 
               
                await dispatch(getAllPostsThunk());           
                 await dispatch(getUserPostsThunk(sessionUser.id));
                closeModal();
            } catch(error) {
                console.log(error);
            };
        } else {
            const postInfo = {
                media : post.media,
                body : body,
                user_id : sessionUser.id
            }

            try {
                await dispatch(editSinglePostThunk(post.id, postInfo)) 
                await dispatch(getUserPostsThunk(sessionUser.id));
                await dispatch(getAllPostsThunk());           
                
                closeModal();
            } catch(error) {
                console.log(error);
            };
        }

       
    };

    useEffect(() => {
        const errors = {};
        if(!body) errors.body = "Please enter your post.";
        if(body.length > 3000) errors.body = errors.bodylength = "Please enter content less than 3000 characters.";
        // if(img && !img.endsWith('.jpg') && !img.endsWith('.png') && !img.endsWith('.jpeg')) errors.imgFormat = "Image URL needs to end in png or jpg (or jpeg)";
        // if(video) {
        //     const videoFrag = video.split("=");
        //     if(!videoFrag[0].includes("https://www.youtube.com/"))  errors.videoFormat = "Please enter valid URL form YouTube."}
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
               errors.mediaFormat = "Please provide valid image or video file ends with pdf, png, jpg, gif, jpeg, gif, mp4, avi, mov, or mkv"}

        setValidationError(errors)
    }, [body, media])

    return (
        <>
        <div id='edit-post-container'>
            <div id='edit-post-title'>
                <h3>Edit Post</h3>
            </div>
            <div id='edit-post-user'>
                <Link to={`/user/${sessionUser.id}/posts`}><img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
                     alt={sessionUser.first_name}/></Link>
                <Link to={`/user/${sessionUser.id}/posts`}><p>{sessionUser.first_name} {sessionUser.last_name}</p></Link>
            </div>
            <form id='edit-post-form' onSubmit={EditPost} encType="multipart/form-data">
      
                    <textarea 
                    
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />

                    {hasSubmit ? 
                        <div id="animationDiv" className="animation-container">
                            <div className="loading-spinner"></div>
                            <p>Uploading...</p>
                        </div>
                        :
                        null
                    }

                    <div id='error-div'>
                        {validationError.bodylength && <p>{validationError.bodylength}</p>}
                    </div>
                
                    {showItem? 
                        <div id='edit-image-div-container'>
                            <div id='edit-image-div'>
                                {/* <img src={post.media} alt='' /> */}
                                {(() => {
                                    if(post.media) {
                                        if(post.media.endsWith("pdf") ||
                                        post.media.endsWith("png") ||
                                        post.media.endsWith("jpg") ||
                                        post.media.endsWith("jpeg") ||
                                        post.media.endsWith("gif")) {
                                            return <>
                                            
                                            <img src={post.media} alt=""/>
                                            </>
                                        } else {
                                            return <>
                            
                                                <video width="100px">
                                                    <source src={post.media} type='video/mp4' />
                                                </video>
                                            
                                            </>
                                        }
                                    }

                                })()}
                                <div id='edit-post-image-div'>
                                    
                                    <i className="fa-solid fa-photo-film"></i>
                                    <input 
                                        type='file'
                                        onChange={(e) => setMedia(e.target.files[0])}
                                    />
                                </div>
                            </div>                             
                        </div>
                        : null
                    }
                    
                    {/* {showItem ? 
                        <div id='edit-video-div'>
                            <i className="fa-solid fa-video"></i>
                            <textarea 
                                type='text'
                                value={ video }
                                onChange={(e) => setVideo(e.target.value)}
                                placeholder="Please provide valid url from YouTube."
                            />
                        </div>

                        
                        : null
                    } */}

                    {validationError.mediaFormat ? 
                        <div id='error-div'>
                            {validationError.mediaFormat && <p>{validationError.mediaFormat}</p>}
                        </div>
                        : null
                    }
                    {/* {validationError.videoFormat ? 
                        <div id='error-div'>
                            {validationError.videoFormat && <p>{validationError.videoFormat}</p>}
                        </div>
                        : null
                    } */}

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