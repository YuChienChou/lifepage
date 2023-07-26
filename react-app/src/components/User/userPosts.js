import { Link } from 'react-router-dom';
import CreatePost from "../CreatePost/CreatePostModal";
import UserPostList from '../PostList/userPostList';
import OpenModalButton from "../OpenModalButton";
import userProfilePicture from '../resources/default-user-profile-picture.png';


export default function UserPosts({sessionUser, user }) {
    
    return (
        <>
        <div id='create-post-div'>
            <Link to={`/user/${sessionUser.id}`}>
                <img src={sessionUser.profile_picture? sessionUser.profile_picture : userProfilePicture} 
                        alt={sessionUser.first_name} /></Link>
        
            <OpenModalButton
                buttonText ={`What's on your mind, ${sessionUser.first_name}?`}
                modalComponent={<CreatePost sessionUser={sessionUser}/>}
            />
        </div>
            
        <div id='post-list-container'>
            <ul>      
                <UserPostList sessionUser={sessionUser} user={user} />
            </ul>
        </div>
        </>
    )
}