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
import UserFollows from '../Follow/UserFollows';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './postList.css'
import { getAllPostsThunk } from '../../store/post';


export default function PostList({ sessionUser }) {
    // const currentUser = useSelector((state) => state.users.currentUser);
    const postsStore = useSelector((state) => state.posts.allPosts);
    // console.log("posts in post list component: ", postsStore);
    const postsArr = Object.values(postsStore);
    const reversedPostsArr = postsArr.slice().reverse();
    const [showEditPostDiv, setShowEditPostDiv] = useState({}); 

    const dispatch = useDispatch()


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

    useEffect(()=> {
        dispatch(getAllPostsThunk());
    }, [dispatch])
    
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
                            {post.User.id !== sessionUser.id ? 
                                <UserFollows sessionUser={sessionUser} followedUserId={post.User.id}/>
                                : null
                            }
                        </div>

                        {post.User.id === sessionUser.id ? 
                            <div id='edit-post-div' onClick={()=> showEditPostDivFun(post.id)}>
                                <i className="fa-solid fa-ellipsis"></i>
                                
                            </div> : null }
                        {showEditPostDiv[post.id] ? 
                        
                            <div id='edit-delete-post-container' onMouseLeave={() => hideEditPostDivFun(post.id)}>
                            
                                <div id='edit-post'>
                                    <i className="fa-solid fa-pen"></i>
                                    {/* <p>Edit post</p> */}
                                    <OpenModalButton
                                        buttonText="Edit post"
                                        modalComponent={<EditPostModal sessionUser={sessionUser} post={post}/>}
                                    />
                                </div>
                            
                                <div id='delete-post'>
                                    <i className="fa-regular fa-trash-can"></i>
                                    {/* <p onClick={deletePost}>Move to trash</p> */}
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
                        {/* <p>{post.title}</p> */}
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
                            } else {
                                return <>
                                <div id='video-post'>
                                    <video controls width="100%">
                                        <source src={post.media} type='video/mp4' />
                                    </video>
                                </div>
                                </>
                            }
                        }

                    })()}

                    <PostLikes sessionUser={sessionUser} postId={post.id} />

                    <CommentList sessionUser={sessionUser} post={post}/>
                    <CreateComment sessionUser={sessionUser} post={post} />
                </div>
                
            </div>
        </li>
         ))}
         </>
    )
}