import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { createCommentThunk } from "../../store/comment";
import { getAllPostsThunk, getUserPostsThunk } from "../../store/post";
import EditDeleteCommentModal from "./EditDeleteCommentModal";
import OpenModalButton from "../OpenModalButton";
import './comment.css'



export default function Comment({sessionUser, post}) {
    // console.log("sessionUser in the comment component: ", sessionUser);
    // console.log("post in the comment component: ", post);
    // console.log("post comments in comment component: ", post.Comments);
    const [content, setContent] = useState("");
    const [validationErrors, setValidationErrors] = useState({})

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentInfo = {
            content, 
            user_id: sessionUser.id,
            post_id: post.id,
        }

        try {
            await dispatch(createCommentThunk(post.id, commentInfo));
            await dispatch(getAllPostsThunk());
            await dispatch(getUserPostsThunk(sessionUser.id))
        } catch(error) {
            console.log(error)
        };

        setContent("")
        
    };

    useEffect(() => {
        const errors = {};
        if(!content) errors.content = "Please enter your comment.";

        setValidationErrors(errors);
    }, [content])

    if (post.Comments.length === 0) {
        return (
        <>
        <div id='comment-form-div'>
           <div id='user-comment'>
                <img src={sessionUser.profile_picture} alt={sessionUser.first_name} />
            </div>
           <form id='create-comment-form' onSubmit={handleSubmit}>
                <textarea 
                    type='text'
                    placeholder='Write a comment'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button 
                    type='submit'
                    disabled={Object.values(validationErrors).length > 0}
                >
                    <i className="fa-solid fa-location-arrow"></i>
                </button>
            </form>
        </div>
        </>
        )
    }


    return (
        <>
        <div id='post-comment'>
            {post.Comments.reverse().map((comment) => (
                
                <li key={comment.id}>
                    <div id='comment-user-div'>
                        <div id='user-comment'>
                            <img src={comment.User.profile_picture} alt={comment.User.first_name} />
                            <div id='comment-and-user-name'>
                                <p id='comment-user-name'>{comment.User.first_name} {comment.User.last_name}</p>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                        {comment.User.id === sessionUser.id ?
                        <OpenModalButton
                            buttonText='Edit/Delete'
                            modalComponent={<EditDeleteCommentModal sessionUser={sessionUser} post={post} comment={comment}/>} 
                        
                        />
                        : null}
                    </div>
                </li>
            ))}

            <div id='comment-form-div'>

                <div id='user-comment'>
                    <img src={sessionUser.profile_picture} alt={sessionUser.first_name} />
                </div>

                <form id='create-comment-form' onSubmit={handleSubmit} >
                    <textarea 
                        type='text'
                        placeholder='Write a comment'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button 
                        type='submit'
                        disabled={Object.values(validationErrors).length > 0}
                    >
                        <i className="fa-solid fa-location-arrow"></i>
                    </button>
                </form>
            </div>

        </div>
        </>
    )

}