import { Link } from 'react-router-dom';
import CreatePost from "../CreatePost/CreatePostModal";
import PostList from "../PostList/PostList";
import CommentList from '../Comments/CommentList';
import CreateComment from '../Comments/CreateComment';
import OpenModalButton from "../OpenModalButton";
import userProfilePicture from '../resources/default-user-profile-picture.png';


export default function UserPosts({sessionUser, user, userPostArr, page}) {
    const reversedUserPostArr = userPostArr.slice().reverse();

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
            
                {reversedUserPostArr.length > 0 ? 
                    <div id='post-list-container'>
                        <ul>
                            {reversedUserPostArr.map((post) => (
                                <>
                                <PostList sessionUser={sessionUser} post={post} />
                                <CommentList sessionUser={sessionUser} post={post} />
                                <CreateComment sessionUser={sessionUser} post={post} />
                                </>
                            ))}
                        </ul>
                    </div>
                    : <p>{user.first_name} doesn't have any posts yet.</p>
                }  
        </>
    )
}