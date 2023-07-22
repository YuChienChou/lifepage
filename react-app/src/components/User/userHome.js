import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPostsThunk } from '../../store/post';
import Navigation from '../Navigation';
import OpenModalButton from '../OpenModalButton';
import CreatePost from '../CreatePost/CreatePostModal';
import PostList from '../PostList/PostList';
import CommentList from '../Comments/CommentList';
import CreateComment from '../Comments/CreateComment';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './user.css'
import { getAllCommentsThunk } from '../../store/comment';

export default function UserHome() {
    const sessionUser = useSelector((state) => state.session.user);
    const postsStore = useSelector((state) => state.posts.allPosts);
    const postsArr = Object.values(postsStore);
    const reversedPostsArr = postsArr.slice().reverse();
 

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
                <Link to={`/user/${sessionUser.id}/posts`}><div id='userhome-user-link'>
                   <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} alt={sessionUser.first_name} />
                    <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                </div></Link>
            </div>
            <div id='userhome-middle'>
                
                <div id='create-post-div'>
                    <Link to={`/user/${sessionUser.id}/posts`}>
                        <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
                             alt={sessionUser.first_name} /></Link>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.first_name}?`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />



                    
                </div>
                <div id='post-list-container'>
                    <ul>
                        {reversedPostsArr.map((post) => (
                            <>
                            <li key={post.id}>
                                <PostList sessionUser={sessionUser} post={post}/>
                                <CommentList sessionUser={sessionUser} post={post}/>
                                <CreateComment sessionUser={sessionUser} post={post} />
                            </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
            <div id='userhome-right'></div>
        </div>
        </>
    )
};