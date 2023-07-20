import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserPostsThunk } from "../../store/post";
import { useParams, Link } from "react-router-dom";
import { getSingleUserThunk } from "../../store/user";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import CreatePost from "../CreatePost/CreatePostModal";
import PostList from "../PostList/PostList";
import EditUserModal from "./EditUserModal";
import userCoverPhoto from '../resources/default-user-cover-photo.png';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './user.css'
import './userprofile.css'



export default function UserPorfile() {
    const { userId } = useParams();
    console.log("user Id in user profile page: ", userId)
    const user = useSelector((state) => state.users.singleUser);
    // console.log("user in the user profile page: ", user)
    const sessionUser = useSelector((state) => state.session.user)
    console.log("session user id in user profile page: ", sessionUser.id)
    const userPostsStore = useSelector((state) => state.posts.userPosts);
    // console.log("user posts in user profile page: ", userPostsStore);
    const userPostArr = Object.values(userPostsStore);
    // console.log("user posts array in user profile page: ", userPostArr);

    const dispatch = useDispatch();

    const newFeatureFun = () => {
        return window.alert("Feature coming soon! 🙂")
    }


    useEffect(() => {
        dispatch(getSingleUserThunk(userId))
        .then(dispatch(getUserPostsThunk(userId)));
    }, [dispatch, userId])

    if(!user) return null;


    return (
        <>
        <Navigation />
        
        <div id="user-profile-container">
            <div id="user-profile-left">
                <Link to='/user'><i className="fa-solid fa-house"></i></Link>
                <Link to={`/user/${sessionUser.id}`}><div id='userprofile-user-link'>
                   <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} alt={sessionUser.first_name} />
                </div></Link>
            </div>
            <div id='user-profile-right'>
                    <div id='user-intro'>
                        <div id='cover-photo'>
                            <img src={user.cover_photo ? user.cover_photo : userCoverPhoto} 
                            alt={user.first_name} />
                        </div>
                        <div id='profile-picture'>
                            <img src={user.profile_picture ? user.profile_picture : userProfilePicture} 
                                 alt={user.first_name} />
                            <div id='edit-profile-div'>
                                <h4>{user.first_name} {user.last_name}</h4>
                                    {Number(userId) === sessionUser.id ? 
                                    <OpenModalButton
                                    buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                    modalComponent={<EditUserModal sessionUser={sessionUser} />}
                                        />
                                    : null
                                }
                                
                            </div>
                            
                            
                        </div>
                        <div id='post-photos'>
                            <p onClick={newFeatureFun}>Posts</p>
                            <p onClick={newFeatureFun}>Photos</p>
                        </div>
                </div>

                <div id="user-photos">

                </div>
                <div id='create-post-div'>
                    <Link to={`/user/${sessionUser.id}`}>
                        <img src={sessionUser.profile_picture? sessionUser.profile_picture : userProfilePicture} 
                             alt={sessionUser.first_name} /></Link>
                
                        <OpenModalButton
                            buttonText ={`What's on your mind, ${sessionUser.first_name}?`}
                            modalComponent={<CreatePost sessionUser={sessionUser}/>}
                        />
                  
                    
                </div>
            
                {userPostArr.length > 0 ? 
                    <div id='post-list-container'>
                    <ul>
                        {userPostArr.reverse().map((post) => (
                            <PostList sessionUser={sessionUser} post={post} />
                        ))}
                    </ul>
                </div>
                    : <p>{user.first_name} doesn't have any posts yet.</p>
                }  
            
            </div>
        </div>
        </>
    );
};