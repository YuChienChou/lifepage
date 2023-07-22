import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import logo from '../resources/lifepage favicon.png';
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import { getSinglePostThunk } from "../../store/post";
import CreateComment from "../Comments/CreateComment";
import EditComment from "../Comments/EditComment";
import DeleteComment from "../Comments/DeleteComment";
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './singlepost.css'
import CommentList from "../Comments/CommentList";

export default function SinglePost() {
    const { postId, page } = useParams();
    console.log("page in single post : " , page);
    const sessionUser = useSelector((state) => state.session.user);
    const singlePost = useSelector((state) => state.posts.singlePost);
    const [editComment, setEditComment] = useState(null);
    const [full, setFull] = useState(false)
    const dispatch = useDispatch();

    const setFullFun = () => {
        setFull(!full);
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
                        <div id='x-logo'>
                            <Link to='/user'><i className="fa-solid fa-x"></i></Link>
                        </div>
                        <Link to='/user'><img src={logo} alt='lifepage logo' /></Link>
                    </div>
                    <div id='single-post-img'>
                        <img src={singlePost.img} alt="" />
                    </div>
                </div>
       
                <div id='single-post-content-div'>
                    <div id={singlePost.body.length >= 1000 ? 'single-post-user-info-body-full' : 'single-post-user-info-body'}>
                        <div id={'single-post-user-info'}>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                <img src={singlePost.User.profile_picture} alt={singlePost.User.first_name} />
                            </Link>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                {singlePost.User.firstname} {singlePost.User.lastname}
                            </Link>
                        </div>
                        <div id='sp-body'>
                            <p>{singlePost.body}</p>
                         </div>
                    </div>

                    <div id={singlePost.body.length >= 1000 ? 'single-post-comment-short' : 'single-post-comment'}>
                        <CommentList sessionUser={sessionUser} post={singlePost}/>
 
                    </div> 
                    <div id='single-post-create-comment'>
                        <CreateComment sessionUser={sessionUser} post={singlePost} />  
                    </div>
            </div>


           

            
        </div>
        </>
    )
}