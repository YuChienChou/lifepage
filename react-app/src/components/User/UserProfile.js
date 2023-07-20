import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserPostsThunk } from "../../store/post";
import { useParams, Link, NavLink } from "react-router-dom";
import { getSingleUserThunk } from "../../store/user";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import UserPosts from "./userPosts";
import UserPhotos from "./userPhotos";
import EditUserModal from "./EditUserModal";
import userCoverPhoto from '../resources/default-user-cover-photo.png';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './user.css'
import './userprofile.css'



export default function UserPorfile() {
    const { userId, page } = useParams();
    // console.log("user Id in user profile page: ", userId);
    // console.log("page in userprofile: ", page)
    const user = useSelector((state) => state.users.singleUser);
    // console.log("user in the user profile page: ", user);
    const sessionUser = useSelector((state) => state.session.user)
    // console.log("session user id in user profile page: ", sessionUser.id);
    const userPostsStore = useSelector((state) => state.posts.userPosts);
    // console.log("user posts in user profile page: ", userPostsStore);
    const userPostArr = Object.values(userPostsStore);
    // console.log("user posts array in user profile page: ", userPostArr);

    const dispatch = useDispatch();


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
                <Link to='/user'><div id='userprofile-home-link'><i className="fa-solid fa-house"></i></div></Link>
                <Link to={`/user/${sessionUser.id}/posts`}><div id='userprofile-user-link'>
                   <img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} alt={sessionUser.first_name} /></div>
                </Link>
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
                        <div id='posts-photos'>
                           <div id='active-navlink-div'><NavLink to={`/user/${userId}/posts`}><p>Posts</p></NavLink></div>
                           <div id='active-navlink-div'><NavLink to={`/user/${userId}/photos`}><p>Photos / Videos</p></NavLink></div>
                        </div>
                </div>
                {page === "posts" ? 
                    <UserPosts sessionUser={sessionUser} user={user} userPostArr={userPostArr} />
                    : null
                }

                {page === "photos" ? 
                    <UserPhotos user={user} userPostArr={userPostArr} userPostsStore={userPostsStore} />
                    : null
                }
                
                
            </div>
        </div>
        </>
    );
};