import ReactPlayer from 'react-player/youtube';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import Comment from '../Comments/Comment';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import EditPostModal from '../EditDeletePost/EditPostModal';
import DeletePostModal from '../EditDeletePost/DeletePostModal';
import './postList.css'



export default function PostList({sessionUser, post}) {
    const [showEditPostDiv, setShowEditPostDiv] = useState(false);
 
    const showEditPostDivFun = () => {
        setShowEditPostDiv(!showEditPostDiv)
    }

    const hideEditPostDivFun = () => {
        setShowEditPostDiv(false)
    }
    
    return (
        <>

        <li key={post.id} className='post-list'>
            {/* {console.log("post in the for loop: ", post)} */}
            <div id='post-list-div'>
            
                    <div id='user-img-name'>
                        <div id='img-and-link'>
                            <Link to={`/user/${post.User.id}`}> 
                                <img src={post.User.profile_picture ? post.User.profile_picture : "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80"} 
                                    alt={post.User.first_name} /></Link>
                            <Link to={`/user/${post.User.id}`}>{post.User.firstname} {post.User.lastname}</Link>
                        </div>

                        {post.User.id === sessionUser.id ? 
                            <div id='edit-post-div' onClick={showEditPostDivFun}>
                                <i className="fa-solid fa-ellipsis"></i>
                                
                            </div> : null }
                        {showEditPostDiv ? 
                        
                            <div id='edit-delete-post-container' onMouseLeave={hideEditPostDivFun}>
                            
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
                    {post.img? 
                    <div id='img-post'>
                    <img src={post.img} alt=""/></div>
                    : null
                    }  
                    {post.video ? 
                        <div id='video-post'>
                            <ReactPlayer url={post.video} controls width='100%' height='100%'/>

                        </div> : null
                
                    }
                </div>
                
            </div>
                <Comment sessionUser={sessionUser} post={post} />
                    
        </li>
        </>
    )
}