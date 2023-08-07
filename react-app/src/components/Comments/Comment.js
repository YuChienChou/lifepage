import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createCommentThunk } from "../../store/comment";
import { getAllPostsThunk, getUserPostsThunk } from "../../store/post";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteCommentModal";
import OpenModalButton from "../OpenModalButton";
import userCoverPhoto from '../resources/default-user-cover-photo.png';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './comment.css'


export default function Comment({sessionUser, post}) {
    // console.log("sessionUser in the comment component: ", sessionUser);
    // console.log("post in the comment component: ", post);
    // console.log("post comments in comment component: ", post.Comments);
    const [content, setContent] = useState("");
    const [editComment, setEditComment] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    const editCommentFun = (commentId) => {
        setEditComment(commentId);
    };

    const hideEditCommentFun = () => {
        setEditComment(null);
    };


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
        if(content.length > 500) errors.contentlength = "Please enter your comment less than 500 character."

        setValidationErrors(errors);
    }, [content])

    if (post.Comments.length === 0) {
        return (
        <>
        <div id='comment-form-div'>
           <div id='user-comment'>
                <Link to={`/user/${sessionUser.id}`}>
                    <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
                         alt={sessionUser.first_name} /></Link>
            </div>
           <form id='create-comment-form' onSubmit={handleSubmit}>
                {/* <textarea 
                    type='text'
                    placeholder='Write a comment'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /> */}
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

    return (
        <>
        <div id='post-comment'>
            {post.Comments.map((comment) => (
                
                <li key={comment.id}>
                    <div id='comment-user-div'>
                        <div id='user-comment'>
                            <Link to={`/user/${comment.User.id}`}>
                                <img src={comment.User.profile_picture ? comment.User.profile_picture : userProfilePicture} 
                                     alt={comment.User.first_name} /></Link>
                            <div id='comment-and-user-name'>
                                <div>
                                    <Link to={`/user/${comment.User.id}`}><p id='comment-user-name'>{comment.User.first_name} {comment.User.last_name}</p></Link>
                                    <p id='comment-content'>{comment.content}</p>
                                </div>
                           
                                {comment.User.id === sessionUser.id ?
                                    <div id='edit-comment-button' onClick={() => editCommentFun(comment.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>                                
                                    : null
                                } 

                                { comment.User.id === sessionUser.id && editComment === comment.id ? 
                                    <div id='edit-delete-comment-container' onMouseLeave={() => hideEditCommentFun(comment.id)} onClick={() => hideEditCommentFun(comment.id)}>
                                        <div id='edit-comment'>
                                            <i className="fa-solid fa-pen"></i>
                                            <OpenModalButton
                                                buttonText='Edit comment'
                                                modalComponent={<EditComment sessionUser={sessionUser} post={post} comment={comment}/>}
                                            />
                                        </div>
                                        <div id='delete-comment'>
                                            <i className="fa-regular fa-trash-can" ></i>
                                            {/* <p onClick={() => {deleteComment(comment.id)}}>Move to trash</p> */}
                                            <OpenModalButton
                                                buttonText='Delete Comment'
                                                modalComponent={<DeleteComment sessionUser={sessionUser} comment={comment} />}
                                            />
                                            
                                        </div>
                                    </div>
                                    : null
                                }

                            </div>
                        </div>
                      
                    </div>
                </li>
            ))}

            <div id='comment-form-div'>

                <div id='user-comment'>
                    <Link to={`/user/${sessionUser.id}`}>
                        <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
                             alt={sessionUser.first_name} /></Link>
                </div>

                <form id='create-comment-form' onSubmit={handleSubmit} >
                    {/* <textarea 
                        type='text'
                        placeholder='Write a comment'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />   */}
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
            

        </div>
        </>
    )

}
