import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createCommentThunk } from "../../store/comment";
import { getAllPostsThunk, getSinglePostThunk, getUserPostsThunk } from "../../store/post";
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './comment.css'

export default function CreateComment({sessionUser, post}) {
    const [content, setContent] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentInfo = {
            content, 
            user_id: sessionUser.id,
            post_id: post.id,
        }

        try {
            await dispatch(createCommentThunk(post.id, commentInfo));
            // await dispatch(getSinglePostThunk(post.id));
            // await dispatch(getUserPostsThunk(sessionUser.id))
            // await dispatch(getAllPostsThunk());
        } catch(error) {
            console.log(error);
        };

        setContent("")
        
    };

    useEffect(() => {
        const errors = {};
        if(!content) errors.content = "Please enter your comment.";
        if(content.length > 500) errors.contentlength = "Please enter your comment less than 500 character."

        setValidationErrors(errors);
    }, [content]);


    return (
        <>
                <div id='comment-form-div'>

                <div id='user-comment'>
                    <Link to={`/user/${sessionUser.id}/posts`}>
                        <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
                             alt={sessionUser.first_name} /></Link>
                </div>

                <form id='create-comment-form' onSubmit={handleSubmit} >
                    <input 
                        type='text'
                        placeholder='Write a comment'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {validationErrors.contentlength ? 
                    <div id='add-comment-error-div'>
                        {validationErrors.contentlength && <p>{validationErrors.contentlength}</p> }
                    </div> 
                    : null
                    }
                    <button 
                        type='submit'
                        disabled={Object.values(validationErrors).length > 0}
                        id={Object.values(validationErrors).length > 0 ? 'send-comment-disabled' : 'send-comment-active'}
                    >
                        <i className="fa-solid fa-location-arrow"></i>
                    </button>     
                </form>                     
            </div> 
        </>
    )

}