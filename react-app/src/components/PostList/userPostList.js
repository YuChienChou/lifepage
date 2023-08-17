import ReactPlayer from 'react-player/youtube';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CommentList from '../Comments/CommentList';
import CreateComment from '../Comments/CreateComment';
import EditPostModal from '../EditDeletePost/EditPostModal';
import DeletePostModal from '../EditDeletePost/DeletePostModal';
import PostLikes from '../Likes/PostLikes';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './postList.css'
import { getUserPostsThunk } from '../../store/post';
import { getCurrentUserThunk } from '../../store/user';



export default function UserPostList({ sessionUser, user, posts }) {
    // console.log("user id in userPostList: ", user.id)
    const currentUser = useSelector((state) => state.users.currentUser);
    const userPostsStore = useSelector((state) => state.posts.userPosts);
    const userPostArr = Object.values(userPostsStore);
    const reversedPostsArr = userPostArr.slice().reverse();
    const [showEditPostDiv, setShowEditPostDiv] = useState({}); 
    const currDate = new Date();
    const dispatch = useDispatch();


    const showEditPostDivFun = (postId) => {
        setShowEditPostDiv((prevShowEditPostDiv) => ({
            ...prevShowEditPostDiv,
            [postId]: true,
          }));
    }

    const hideEditPostDivFun = (postId) => {
        setShowEditPostDiv((prevShowEditPostDiv) => ({
            ...prevShowEditPostDiv,
            [postId]: false,
          }));
    }

    useEffect(() => {
        dispatch(getUserPostsThunk(user.id));
        // dispatch(getCurrentUserThunk());
    }, [dispatch, user]);

    if(reversedPostsArr.length === 0) {
        return (
            <>
            <div>
                <p id='no-post'>{user.username} doesn't have any posts yet.</p>
            </div>
            
            </>
        )
    }
    
    return (
        
        <>
        {reversedPostsArr.map((post) => (
        <li key={post.id} className='post-list'>

            <div id='post-list-div'>
            
                    <div id='user-img-name'>
                        <div id='img-and-link'>
                            <Link to={`/user/${post.User.id}/posts`}> 
                                <img src={post.User.profile_picture ? post.User.profile_picture : userProfilePicture} 
                                    alt={post.User.first_name} /></Link>
                            <div id='post-date'>
                                <Link to={`/user/${post.User.id}/posts`}>{post.User.username ? post.User.username : post.User.first_name}</Link>

                                {(() => {
                                        
                                        const createdDate = new Date(post.created_at);
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
                       

                        {post.User.id === sessionUser.id ? 
                            <div id='edit-post-div' onClick={() => showEditPostDivFun(post.id)}>
                                <i className="fa-solid fa-ellipsis"></i>
                                
                            </div> : null }
                        {showEditPostDiv[post.id] ? 
                        
                            <div id='edit-delete-post-container' onMouseLeave={() => hideEditPostDivFun(post.id)}>
                            
                                <div id='edit-post'>
                                    <i className="fa-solid fa-pen"></i>
                                
                                    <OpenModalButton
                                        buttonText="Edit post"
                                        modalComponent={<EditPostModal sessionUser={sessionUser} post={post}/>}
                                    />
                                </div>
                            
                                <div id='delete-post'>
                                    <i className="fa-regular fa-trash-can"></i>
                                    
                                    <OpenModalButton 
                                        buttonText="Delete post"
                                        modalComponent={<DeletePostModal sessionUser={sessionUser} post={post} />}
                                    />
                                </div>
                            </div>
                            : null 
                        }
                    </div>
                    
                <div id='post-content'>
                    <div id='content'>
                        <p>{post.body}</p>
                    </div>

                    {(() => {
                        if(post.media) {
                            if(post.media.endsWith("pdf") ||
                               post.media.endsWith("png") ||
                               post.media.endsWith("jpg") ||
                               post.media.endsWith("jpeg") ||
                               post.media.endsWith("gif")) {
                                return <>
                                <Link to={`/posts/${post.id}`}><div id='img-post'>
                                <img src={post.media} alt=""/></div></Link>
                                </>
                            } 
                            else if(post.media.startsWith('https://www.youtube.com')) {
                                return <>
                                    <div id='video-post'>
                                        <ReactPlayer url={post.media} controls width='100%' height='100%'/>
                                    </div>
                                </>
                            }
                            else {
                                return <>
                                <div id='video-pot'>
                                    <video controls width="100%">
                                        <source src={post.media} type='video/mp4' />
                                    </video>
                                </div>
                                </>
                            }
                        }

                    })()}

                    <div id='like-circle'>
                        <i className="fa-regular fa-thumbs-up"></i>
                        {(() => {

                            const likedUsers = [];
                            post.likes.map((user) => (

                                (user.username ? 
                                    likedUsers.push(user.username)
                                    : 
                                    likedUsers.push(user.first_name)
                            )))

                            // console.log("likedUsers user name list: ", likedUsers);
                            // console.log("post likes array length: ", post.likes.length);
                            if(post.likes.length === 0) {
                                return (
                                    <>
                                    <p>Be the first to like this post</p>
                                    </>
                                )
                            } else if (post.likes.length === 1) {
                                return (
                                    <>
                                    {/* <p>{likedUsers[0]} likes this post.</p> */}
                                    <p>1 like</p>
                                    </>
                                )
                            } 

                            // else if(post.likes.length === 2) {
                                
                            //         return (
                            //             <>
                            //             <p>{likedUsers[0]} and {likedUsers[1]} like this post.</p>
                            //             </>
                            //         )
                            // } 
                            else {
                                return (
                                    <>
                                    <p>{post.likes.length} likes</p>
                                    </>
                                )
                            }
                            })()}
                    </div>
                    <div id='post-likes-container'>
                     <PostLikes sessionUser={currentUser} postId={post.id} user={user}/>
                    </div>
                  
                    <CommentList sessionUser={currentUser} post={post}/>
                    <CreateComment sessionUser={currentUser} post={post} />
                </div>
                
            </div>
        </li>
       
        
         ))}
         </>
    )
}