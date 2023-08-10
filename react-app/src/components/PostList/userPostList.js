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
        dispatch(getCurrentUserThunk());
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
                            <Link to={`/user/${post.User.id}/posts`}>{post.User.firstname} {post.User.lastname}</Link>
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
                    {/* {post.img? 
                        <Link to={`/posts/${post.id}`}><div id='img-post'>
                        <img src={post.img} alt=""/></div></Link>
                        : null
                    }  
                    {post.video ? 
                        <div id='video-post'>
                            <ReactPlayer url={post.video} controls width='100%' height='100%'/>
                        </div>
                        : null
                    } */}

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

                    <PostLikes sessionUser={currentUser} postId={post.id} />
                    <CommentList sessionUser={currentUser} post={post}/>
                    <CreateComment sessionUser={currentUser} post={post} />
                </div>
                
            </div>
        </li>
       
        
         ))}
         </>
    )
}