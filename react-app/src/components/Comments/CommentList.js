import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCommentsThunk } from "../../store/comment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import OpenModalButton from "../OpenModalButton";
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './comment.css'

export default function CommentList({sessionUser, post}) {
    const [editComment, setEditComment] = useState(null);
    const postCommentStore = useSelector((state) => state.comments.allComments);
    const postCommentArr = Object.values(postCommentStore).filter((comment) => comment.post_id === post.id);

    const dispatch = useDispatch();

    const editCommentFun = (commentId) => {
        setEditComment(commentId);
    };

    const hideEditCommentFun = () => {
        setEditComment(null);
    };

    useEffect(() => {
        dispatch(getAllCommentsThunk(post.id));
    }, [dispatch, post]);

    return (
        <>
        <div id='post-comment'>
            {postCommentArr.map((comment) => (
                
                <li key={comment.id}>
                    <div id='comment-user-div'>
                        <div id='user-comment'>
                            <Link to={`/user/${comment.User.id}/posts`}>
                                <img src={comment.User.profile_picture ? comment.User.profile_picture : userProfilePicture} 
                                     alt={comment.User.first_name} /></Link>
                            <div id='comment-and-user-name'>
                                <div>
                                    <Link to={`/user/${comment.User.id}/posts`}><p id='comment-user-name'>{comment.User.first_name} {comment.User.last_name}</p></Link>
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
                                            <OpenModalButton
                                                buttonText='Delete Comment'
                                                modalComponent={<DeleteComment sessionUser={sessionUser} post={post} comment={comment} />}
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
        </div>
        </>
    )

}