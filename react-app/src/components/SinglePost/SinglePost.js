import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getSinglePostThunk, editSinglePostThunk } from "../../store/post";
import PostLikes from "../Likes/PostLikes";
import CommentList from "../Comments/CommentList";
import CreateComment from "../Comments/CreateComment";
import logo from '../resources/lifepage favicon.png';
import './singlepost.css'
import { getCurrentUserThunk } from "../../store/user";


export default function SinglePost() {
    const { postId } = useParams();
    // console.log("page in single post : " , page);
    const currentUser = useSelector((state) => state.users.currentUser);
    const singlePost = useSelector((state) => state.posts.singlePost);
    // console.log("single post media in single post component: ", singlePost.media);
    const [body, setBody] = useState(singlePost.body);
    const [editPost, setEditPost] = useState(false);
    const dispatch = useDispatch();
    const currDate = new Date();

    const showEditFun = () => {
        setEditPost(true);
    }

    const EditSinglePost = async (e) => {
        e.preventDefault();

        const postInfo = {
            body,
            user_id : currentUser.id
        }
      
        await dispatch(editSinglePostThunk(singlePost.id, postInfo));
        await dispatch(getSinglePostThunk(singlePost.id));
     
        setEditPost(false)
    };

    useEffect(() => {
        setBody(singlePost.body);
      }, [singlePost.body]);

    useEffect(() => {
        dispatch(getSinglePostThunk(postId));
        dispatch(getCurrentUserThunk());
    }, [dispatch, postId]);

    if (!singlePost.id) {
        return <div>Loading...</div>;
      }

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

                  
                    {(() => {
                        if((singlePost.media && !singlePost.share_img) || (!singlePost.media && singlePost.share_img)) {
                            return <div id='single-post-img'>
                        <img src={singlePost.media ? singlePost.media : singlePost.share_img} alt=""/>
                        {/* <img src={singlePost.media} alt="" /> */}
                        {/* <img src={singlePost.share_img} alt="" /> */}
                    </div>
                        } 
                        else if (singlePost.media && singlePost.share_img) {
                            return <>
                            <session aria-label='Singlepost Photos'>
                                <div className='carousel'>
                                    <button className="carousel-button prev"><i className="fa-solid fa-arrow-right"></i></button>
                                    <button className="carousel-button next"><i className="fa-solid fa-arrow-left"></i></button>
                                    <ul>
                                        <li className='slide' data-active>
                                            <img src={singlePost.media} alt="media photo" />
                                        </li>
                                        <li className='slide'>
                                            <img src={singlePost.share_img} alt="share image" />
                                        </li>
                                    </ul>
                                </div>
                            </session>
                            </>
                        }
                    })()}
                    
                </div>
       
                <div id='single-post-content-div'>
                    <div id={singlePost.body.length >= 1000 ? 'single-post-user-info-body-full' : 'single-post-user-info-body'}>
                        <div id={'single-post-user-info'}>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                <img src={singlePost.User.profile_picture} alt={singlePost.User.first_name} />
                            </Link>
                            <div id='post-date'>
                                <Link to={`/user/${singlePost.User.id}/posts`}>
                                    {singlePost.User.firstname} {singlePost.User.lastname}
                                </Link>
                                {(() => {
                                        
                                        const createdDate = new Date(singlePost.created_at);
                                        const timeDiff = Math.round((currDate - createdDate) / (1000 * 60 * 60 * 24));
                                        if(timeDiff > 1) {
                                            return <p id="day">{timeDiff}ds ago</p>;
                                        } else if(timeDiff > 365) {
                                            return <p id="day">{Math.round(timeDiff / 365) > 1 ? `${Math.round(timeDiff / 365)} years ago.` : `1 year ago` }</p>
                                        }
                                        // else if (timeDiff < 1) {
                                        //     return <p id='day'>{Math.round(timeDiff / 60)} hrs ago</p>
                                        // }
                                        return <p id='day'>{Math.round(timeDiff / 60) < 1 ? `Today` : `${(timeDiff / 60).toFixed(1)} hrs ago`} </p>
                                        // const createdArr = createdStr.split(" ");
                                        // console.log("createdArr: ", createdArr);
                                        // return <p>{createdArr[2]} {createdArr[1]} {createdArr[3]}</p>
                                    })()}
                            </div>
                        </div>
                        <div id='sp-body'>

                            {(() => {
                                if(singlePost.User.id === currentUser.id) {

                                        if(editPost === true) {

                                            return (
                                            <>
                                            <form onSubmit={EditSinglePost} id='edit-single-post-form'>
                                                <textarea 
                                                    type='text'
                                                    value={body}
                                                    onChange={(e) => setBody(e.target.value)}
                                                />
                                                <button type='submit'>{editPost ? "Save" : "Edit"}</button>
                                            </form>
                                            </>
                                        )
                                    } 
                                    else {
                                        return  (
                                        <>
                                        <div id='sp-content'>
                                            <p>{singlePost.body}</p>
                                            <button onClick={showEditFun}>Edit</button>
                                        </div>
                                        </>)
                                    }
                                    
                                } else {
                                    return (<p>{singlePost.body}</p>)
                                }
                            }
                            )()}

                        </div>
                         
                    </div>
                    <div id='like-circle'>
                        <i className="fa-regular fa-thumbs-up"></i>
                        {(() => {

                            const likedUsers = [];
                            singlePost.likes.map((user) => (

                                (user.username ? 
                                    likedUsers.push(user.username)
                                    : 
                                    likedUsers.push(user.first_name)
                            )))

                            // console.log("likedUsers user name list: ", likedUsers);
                            // console.log("post likes array length: ", post.likes.length);
                            if(singlePost.likes.length === 0) {
                                return (
                                    <>
                                    <p>Be the first to like this post</p>
                                    </>
                                )
                            } else if (singlePost.likes.length === 1) {
                                return (
                                    <>
                                    {/* <p>{likedUsers[0]} likes this post.</p> */}
                                    <p>1 like</p>
                                    </>
                                )
                            } 

                            // else if(singlePost.likes.length === 2) {
                                
                            //         return (
                            //             <>
                            //             <p>{likedUsers[0]} and {likedUsers[1]} like this post.</p>
                            //             </>
                            //         )
                            // } 
                            else {
                                return (
                                    <>
                                    {/* <p>{singlePost.likes.length} people like this post.</p> */}
                                    <p>{singlePost.likes.length} likes</p>
                                    </>
                                )
                            }
                            })()}
                    </div>
                    

                    <div id='post-likes-container'>
                        <PostLikes sessionUser={currentUser} postId={singlePost.id} user={singlePost.User}/>
                    </div>

                    <div id={singlePost.body.length >= 1000 ? 'single-post-comment-short' : 'single-post-comment'}>
                        <CommentList sessionUser={currentUser} post={singlePost}/>
 
                    </div> 
                    <div id='single-post-create-comment'>
                        <CreateComment sessionUser={currentUser} post={singlePost} />  
                    </div>
            </div>
        </div>
        </>
    )
}