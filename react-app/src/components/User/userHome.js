import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPostsThunk } from '../../store/post';
import Navigation from '../Navigation';
import OpenModalButton from '../OpenModalButton';
import CreatePost from '../CreatePost/CreatePostModal';
import Comment from '../Comments/Comment';
import EditDeletePostModal from '../EditDeletePost/EditDeletePostModal';

import './user.css'

export default function UserHome() {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("logged in user in the userHome page: ", sessionUser);
    const postsStore = useSelector((state) => state.posts.allPosts);
    // console.log("postsStore in the post component: ", postsStore);
    const postsArr = Object.values(postsStore);
    // console.log("Post array in the user home component: ", postsArr);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    if(!sessionUser || postsArr.length < 1) return null;

    return (
        <>
        <Navigation />
        <div id='user-home-container'>
            <div id='userhome-left'>
                <Link to='/user'><div id='userhome-home-link'>
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </div></Link>
                <Link to={`/user/${sessionUser.id}`}><div id='userhome-user-link'>
                   <img src={sessionUser.profile_picture} alt={sessionUser.first_name} />
                    <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                </div></Link>
            </div>
            <div id='userhome-middle'>
                <div>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.first_name}`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />
                </div>
                <div id='post-list-container'>
                    <ul>
                        {postsArr.reverse().map((post) => (
                        // console.log("post in the for loop: ", post)
                        
                            <li key={post.id} className='post-list'>
                                {/* {console.log("post in the for loop: ", post)} */}
                                <div id='post-list-div'>
                                    <div>
                                        <div id='user-img-name'>
                                            <Link to={`/user/${post.User.id}`}> <img src={post.User.profile_picture} alt={post.User.first_name} />
                                            <p>{post.User.firstname} {post.User.lastname}</p></Link>
                                        </div>
                                        {post.User.id === sessionUser.id ? 
                                            <div>
                                                <OpenModalButton
                                                    buttonText="Edit/Delete"
                                                    modalComponent={<EditDeletePostModal sessionUser={sessionUser} post={post}/>}
                                                />
                                            </div> : null 
                                        }
                                    </div>
                                    <div id='post-content'>
                                        <p>{post.title}</p>
                                        <p>{post.body}</p>
                                        <img src={post.img} alt=""/>
                                    </div>
                                    {/* {post.video ? 
                                        <div>
                                            <video controls width='250'>
                                                <source src={post.video} type='video/mp4'></source>
                                            </video>

                                        </div> : null
                                    
                                    } */}
                                </div>
                                <Comment sessionUser={sessionUser} post={post} />
                                            
                            </li>
                        
                        ))}
                    </ul>
                </div>
            </div>
            <div id='userhome-right'>right div</div>
        </div>
        </>
    )
};