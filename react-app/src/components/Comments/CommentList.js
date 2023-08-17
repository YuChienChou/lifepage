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
    // console.log("post comments in CommentList component: ", post.Comments);
    const [editComment, setEditComment] = useState(null);
    const postCommentStore = useSelector((state) => state.comments.allComments);
    console.log("All comments in CommentLIst component: ", postCommentStore);
    const postCommentArr = Object.values(postCommentStore).filter(comment => comment.post_id === post.id);
    console.log("All comments array in CommentList component:", postCommentArr);
    const currDate = new Date();

    const dispatch = useDispatch();

    const editCommentFun = (commentId) => {
        setEditComment(commentId);
    };

    const hideEditCommentFun = () => {
        setEditComment(null);
    };

    useEffect(() => {
        dispatch(getAllCommentsThunk());
    }, [dispatch, post]);
    // useEffect(() => {
    //     const fetchCommentsForPost = async (postId) => {
    //         await dispatch(getAllCommentsThunk(postId));
    //     };
    
    //     fetchCommentsForPost(post.id);
    // }, [dispatch, post.id]);

    return (
        <>
        <div id='post-comment'>
            {postCommentArr.map((comment) => (
                <ul>
                <li key={comment.id}>
                    <div id='comment-user-div'>
                        <div id='user-comment-div'>
                            <div id='user-comment'>
                                <Link to={`/user/${comment.User.id}/posts`}>
                                    <img src={comment.User.profile_picture ? comment.User.profile_picture : userProfilePicture} 
                                        alt={comment.User.first_name} /></Link>
                                <div id='comment-and-user-name'>
                                    
                                    <div>
                                        <Link to={`/user/${comment.User.id}/posts`}><p id='comment-user-name'>{comment.User.username ? comment.User.username : comment.User.first_name}</p></Link>
                                        <p id='comment-content'>{comment.content}</p>
                                    </div>
                                    <div>
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
                                </div></div>
                                </div>
                                <div id='comment-day'>
                                {(() => {
                                    const createdDate = new Date(comment.created_at);
                                    const timeDiff = Math.round((currDate - createdDate) / (1000 * 60 * 60 * 24));
                                    if(timeDiff > 1) {
                                        return <p id="day">{timeDiff}ds ago</p>;
                                    } else if(timeDiff > 365) {
                                        return <p id="day">{Math.round(timeDiff / 365) > 1 ? `${Math.round(timeDiff / 365)} years ago.` : `1 year ago` }</p>
                                    }
                                    // else if (timeDiff < 1) {
                                    //     return <p id='day'>{Math.round(timeDiff / 60)} hrs ago</p>
                                    // }
                                    return <p id='day'>{Math.round(timeDiff / 60) < 1 ? `Today` : `${(timeDiff / 60).toFixed(2)} hrs ago`} </p>
                                    // const createdArr = createdStr.split(" ");
                                    // console.log("createdArr: ", createdArr);
                                    // return <p>{createdArr[2]} {createdArr[1]} {createdArr[3]}</p>
                                })()}
                            
                            </div>

                            
                        </div>
                         
                    </div>
                   
                </li>
                </ul>
            ))}
        </div>
        </>
    )

}