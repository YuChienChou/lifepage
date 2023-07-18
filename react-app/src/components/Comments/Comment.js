import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { createCommentThunk } from "../../store/comment";
import { deleteCommentThunk } from "../../store/comment";
import { getAllPostsThunk, getUserPostsThunk } from "../../store/post";
import EditDeleteCommentModal from "./EditDeleteCommentModal";
import EditComment from "./EditComment";
import OpenModalButton from "../OpenModalButton";
import './comment.css'



export default function Comment({sessionUser, post}) {
    // console.log("sessionUser in the comment component: ", sessionUser);
    // console.log("post in the comment component: ", post);
    // console.log("post comments in comment component: ", post.Comments);
    const [content, setContent] = useState("");
    const [editComment, setEditComment] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    const editCommentFun = () => {
        setEditComment(!editComment);
    };

    const hideEditCommentFun = () => {
        setEditComment(false);
    };

    const deleteComment = async (commentId) => {
        await dispatch(deleteCommentThunk(commentId));
        await dispatch(getAllPostsThunk());
        await dispatch(getUserPostsThunk(sessionUser.id));
        // closeModal();
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
                            <img src={comment.User.profile_picture} alt={comment.User.first_name} />
                            <div id='comment-and-user-name'>
                                <div>
                                    <p id='comment-user-name'>{comment.User.first_name} {comment.User.last_name}</p>
                                    <p id='comment-content'>{comment.content}</p>
                                </div>
                           
                                {comment.User.id === sessionUser.id ?
                                    <div id='edit-comment-button' onClick={editCommentFun}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>                                
                                    : null


                                    
                                } 

                                { comment.User.id === sessionUser.id && editComment ? 
                                    <div id='edit-delete-comment-container' >
                                        <div id='edit-comment'>
                                            <i className="fa-solid fa-pen"></i>
                                            <OpenModalButton
                                                buttonText='Edit comment'
                                                modalComponent={<EditComment sessionUser={sessionUser} post={post} comment={comment}/>}
                                            />
                                        </div>
                                        <div id='delete-comment'>
                                            <i className="fa-regular fa-trash-can" ></i>
                                            <p onClick={() => {deleteComment(comment.id)}}>Move to trash</p>
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