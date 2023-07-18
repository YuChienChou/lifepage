import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPostsThunk } from '../../store/post';
import Navigation from '../Navigation';
import OpenModalButton from '../OpenModalButton';
import CreatePost from '../CreatePost/CreatePostModal';
import PostList from '../PostList/PostList';

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
                   <img src={sessionUser.profile_picture ? sessionUser.profile_picture : "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80"} alt={sessionUser.first_name} />
                    <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                </div></Link>
            </div>
            <div id='userhome-middle'>
                
                <div id='create-post-div'>
                    <Link to={`/user/${sessionUser.id}`}>
                        <img src={sessionUser.profile_picture ? sessionUser.profile_picture : "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80"} 
                             alt={sessionUser.first_name} /></Link>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.first_name}?`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />
                </div>
                <div id='post-list-container'>
                    <ul>
                        {postsArr.reverse().map((post) => (
                            <PostList sessionUser={sessionUser} post={post} />
                        ))}
                    </ul>
                </div>
            </div>
            <div id='userhome-right'></div>
        </div>
        </>
    )
};