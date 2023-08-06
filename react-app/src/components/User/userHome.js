import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPostsThunk } from '../../store/post';
import Navigation from '../Navigation';
import OpenModalButton from '../OpenModalButton';
import CreatePost from '../CreatePost/CreatePostModal';
import PostList from '../PostList/PostList';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './user.css'

export default function UserHome() {
    const sessionUser = useSelector((state) => state.session.user);
    const currentUser = useSelector((state) => state.users.currentUser);
 
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    if(!sessionUser) return null;

    return (
        <>
        <Navigation />
        <div id='user-home-container'>
            <div id='userhome-left'>
                <Link to='/user'><div id='userhome-home-link'>
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </div></Link>
                <Link to={`/user/${currentUser.id}/posts`}><div id='userhome-user-link'>
                   <img src={currentUser.profile_picture ? currentUser.profile_picture : userProfilePicture} alt={currentUser.first_name} />
                    <p>{currentUser.first_name} {currentUser.last_name}</p>
                </div></Link>
            </div>
            <div id='userhome-middle'>
                
                <div id='create-post-div'>
                    <Link to={`/user/${currentUser.id}/posts`}>
                        <img src={currentUser.profile_picture ? currentUser.profile_picture : userProfilePicture} 
                             alt={currentUser.first_name} /></Link>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${currentUser.first_name}?`}
                        modalComponent={<CreatePost sessionUser={currentUser}/>}
                    />                    
                </div>
                <div id='post-list-container'>
                    <ul>
                        <PostList sessionUser={currentUser}/>
                    </ul>
                </div>
            </div>
            <div id='userhome-right'></div>
        </div>
        </>
    )
};