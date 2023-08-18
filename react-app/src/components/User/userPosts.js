import { Link } from 'react-router-dom';
import CreatePost from "../CreatePost/CreatePostModal";
import UserPostList from '../PostList/userPostList';
import OpenModalButton from "../OpenModalButton";
import UserInfo from './userInfo';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import UserFollowers from '../Follow/userFollowerList';
import UserFollowsList from '../Follow/userFollowList';

export default function UserPosts({sessionUser, user }) {
    
    return (
        <>
        {/* <div id='user-follows-div'> */}
            <UserFollowsList sessionUser={sessionUser} user={user}/>  
            <UserFollowers sessionUser={sessionUser} user={user} /> 
        {/* </div>   */}

        <div id='user-info-post-container'>
            <div id="userinfo">
                <UserInfo user={user} />
            </div>
            <div id='userposts'>
                <div id='create-post-div'>
                    <Link to={`/user/${sessionUser.id}/posts`}>
                        <img src={sessionUser.profile_picture? sessionUser.profile_picture : userProfilePicture} 
                                alt={sessionUser.first_name} /></Link>
                
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.username ? sessionUser.username : sessionUser.first_name}?`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />
                </div>
                    
                <div id='post-list-container'>
                    <ul>      
                        <UserPostList sessionUser={sessionUser} user={user} />
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}