import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { editPostThunk, editSinglePostThunk, getAllPostsThunk, getUserPostsThunk } from '../../store/post';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './editPost.css'

export default function EditPostModal({sessionUser, post }) {
    const [media, setMedia] = useState("");
    // console.log("post media in editPostModal: ", post.media);
    const [shareImg, setShareImg] = useState(post.share_img);
    const [shareVideo, setShareVideo] = useState(post.share_video);
    const [body, setBody] = useState(post.body);
    const [validationError, setValidationError] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const [showItem, setShowItem] = useState(false)
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

    const EditPost = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = new FormData();
        if(media) {
            postInfo.append("media", media);
            postInfo.append('body', body);
            postInfo.append("user_id", sessionUser.id);
            postInfo.append("share_img", shareImg);
            postInfo.append("share_video", shareVideo);
        } else {
            postInfo.append("media", post.media);
            postInfo.append('body', body);
            postInfo.append("user_id", sessionUser.id);
            postInfo.append("share_img", shareImg);
            postInfo.append("share_video", shareVideo);
        }
        
        await dispatch(editPostThunk(post.id, postInfo)) 
        await dispatch(getAllPostsThunk());           
        await dispatch(getUserPostsThunk(sessionUser.id));
        closeModal();

        // if(media) {
        //     const postInfo = new FormData();
        //     postInfo.append("media", media);
        //     postInfo.append("body", body);
        //     postInfo.append("user_id", sessionUser.id);
        //     postInfo.append("share_img", shareImg);
        //     postInfo.append("share_video", shareVideo);
            
        //     await dispatch(editPostThunk(post.id, postInfo)) 
        //     await dispatch(getAllPostsThunk());           
        //     await dispatch(getUserPostsThunk(sessionUser.id));
        //     closeModal();
         
        // } 
        // else {
        //     const postInfo = {
        //         media : post.media,
        //         body : body,
        //         user_id : sessionUser.id,
        //         share_img : shareImg,
        //         share_video : shareVideo,

        //     }
        //         await dispatch(editPostThunk(post.id, postInfo)) 
        //         await dispatch(getUserPostsThunk(sessionUser.id));
        //         await dispatch(getAllPostsThunk());           
                
        //         closeModal();
        // }       
    };


    useEffect(() => {
        const errors = {};
        if(!body) errors.body = "Please enter your post.";
        if(body.length > 3000) errors.body = errors.bodylength = "Please enter content less than 3000 characters.";
   
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
               errors.mediaFormat = "Please provide valid image or video file ends with pdf, png, jpg, or gif."}

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
    }, [body, media, shareImg, shareVideo])

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
                                    <div>
                                        <i className="fa-solid fa-photo-film"></i>
                                        <input 
                                            type='file'
                                            // onChange={(e) => setMedia(e.target.files[0])}
                                            onChange={handleMediaChange}
                                        />
                                    </div>
                                    <p>Please provide a file size under 100MB or you can share an image/video by providing a valid URL..</p>
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
                            </div>                             
                        </div>
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
                        id={Object.values(validationError).length > 0 ? 'edit-post-button-disabled' : 'edit-post-button-active'}
                    >
                        Save
                    </button>
                
            </form>
        </div>
        </>
    )
}