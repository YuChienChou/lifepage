import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from 'react-router-dom'
import { logout } from '../../store/session';
import logo from '../resources/lifepage favicon.png';
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateComment from "../Comments/CreateComment";
import { getSinglePostThunk } from "../../store/post";
import EditComment from "../Comments/EditComment";
import DeleteComment from "../Comments/DeleteCommentModal";
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './singlepost.css'
import { getAllCommentsThunk } from "../../store/comment";

export default function SinglePost() {
    const { postId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const singlePost = useSelector((state) => state.posts.singlePost);
    const postCommentStore = useSelector((state) => state.comments.allComments);
    // console.log("post comments in singel post page: ", postCommentStore);
    const postCommentArr = Object.values(postCommentStore);
    // console.log("post comment array in single post page: ", postCommentArr);
    // console.log("single post comment array : ", singlePost.Comments);
    const [editComment, setEditComment] = useState(null);
    // console.log("single post in single post component: ", singlePost);
    const dispatch = useDispatch();
    const [showInfo, setShowInfo] = useState(false);
	const history = useHistory();

	const showInfoFuntion = () => {
		setShowInfo(true)
	};

	const hideInfoFunction = () => {
		setShowInfo(false)
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push('/');
	  };

    const editCommentFun = (commentId) => {
        setEditComment(commentId);
    };

    const hideEditCommentFun = () => {
        setEditComment(null);
    };

    useEffect(() => {
        dispatch(getSinglePostThunk(postId));
        // dispatch(getAllCommentsThunk(singlePost.id));
    }, [dispatch, postId]);

    if(!singlePost.User) return null;

    return (
        <>
        <div id='singlePost-container'>
                <div id='single-post-logo-img'>
                    <div id='single-post-logo'>
                        <Link to='/user'><img src={logo} alt='lifepage logo' /></Link>
                    </div>
                    <div id='single-post-img'>
                        <img src={singlePost.img} alt="" />
                    </div>
                </div>
       
                <div id='single-post-content-div'>
                    <div id='single-post-user-info-body'>

                   
                        <div id='single-post-user-info'>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                <img src={singlePost.User.profile_picture} alt={singlePost.User.first_name} />
                            </Link>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                <p>{singlePost.User.firstname} {singlePost.User.lastname}</p>
                            </Link>
                        </div>
                        <p>{singlePost.body}</p>
                    </div>
                    <div id='single-post-comment'>
                        {singlePost.Comments.map((comment) => (
                        
                            <li key={comment.id}>
                                <div id='single-post-comment-user-div'>
                                    <div id='single-post-user-comment'>
                                        <Link to={`/user/${comment.User.id}/posts`}>
                                            <img src={comment.User.profile_picture ? comment.User.profile_picture : userProfilePicture} 
                                                alt={comment.User.first_name} />
                                        </Link>
                                        <div id='single-post-comment-and-user-name'>
                                            <div id='single-post-comment-content'>
                                                <Link to={`/user/${comment.User.id}/posts`}><p id='single-post-comment-user-name'>{comment.User.first_name} {comment.User.last_name}</p></Link>
                                                <p id='single-post-comment-content-p'>{comment.content}</p>
                                            </div>
                                    
                                            {comment.User.id === sessionUser.id ?
                                                <div id='edit-comment-button' onClick={() => editCommentFun(comment.id)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </div>                                
                                                : null
                                            } 

                                            { comment.User.id === sessionUser.id && editComment === comment.id ? 
                                                <div id='sp-edit-delete-comment-container' onMouseLeave={() => hideEditCommentFun(comment.id)} onClick={() => hideEditCommentFun(comment.id)}>
                                                    <div id='edit-comment'>
                                                        <i className="fa-solid fa-pen"></i>
                                                        <OpenModalButton
                                                            buttonText='Edit comment'
                                                            modalComponent={<EditComment sessionUser={sessionUser} post={singlePost} comment={comment}/>}
                                                        />
                                                    </div>
                                                    <div id='delete-comment'>
                                                        <i className="fa-regular fa-trash-can" ></i>
                                                        {/* <p onClick={() => {deleteComment(comment.id)}}>Move to trash</p> */}
                                                        <OpenModalButton
                                                            buttonText='Delete Comment'
                                                            modalComponent={<DeleteComment sessionUser={sessionUser} post={singlePost} comment={comment} />}
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
                    <div id='single-post-create-comment'>
                        <CreateComment sessionUser={sessionUser} post={singlePost} />  
                    </div>
            </div>


           

            
        </div>
        </>
    )
}