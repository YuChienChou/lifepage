import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { getCurrentUserThunk, getSingleUserThunk, getUserFollowersThunk, getUserFollowsThunk } from "../../store/user";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import UserPosts from "./userPosts";
import UserPhotos from "./userPhotos";
import EditUserModal from "./EditUserModal";
import UserFollows from "../Follow/UserFollows";
import UserRequests from "./userRequest";
import SendRequest from "../Request/sendRequest";
import userCoverPhoto from '../resources/default-user-cover-photo.png';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import UserFollowsList from "../Follow/userFollowList";
import './user.css'
import './userprofile.css'
import UserFollowers from "../Follow/userFollowerList";



export default function UserPorfile() {
    const { userId, page } = useParams();
    
    const user = useSelector((state) => state.users.singleUser);
    const sessionUser = useSelector((state) => state.session.user);
    const currentUser = useSelector((state) => state.users.currentUser);
    // console.log("user id and session user id: ", user.id, currentUser.id )
    const userPostsStore = useSelector((state) => state.posts.userPosts);
    const userPostArr = Object.values(userPostsStore);
    

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getSingleUserThunk(userId));
        dispatch(getCurrentUserThunk());
        dispatch(getUserFollowsThunk(sessionUser.id));
    }, [dispatch, userId, sessionUser.id])


    return (
        <>
        <Navigation />
        
        <div id="user-profile-container">
            <div id="user-profile-left">
                <Link to='/user'><div id='userprofile-home-link'><i className="fa-solid fa-house"></i></div></Link>
                <Link to={`/user/${currentUser.id}/posts`}><div id='userprofile-user-link'>
                   <img src={currentUser.profile_picture ? currentUser.profile_picture : userProfilePicture} alt={currentUser.first_name} /></div>
                </Link>
            </div>
            <div id='user-profile-right'>
                    <div id='user-intro'>
                        <div id='cover-photo'>
                            <div id='cover-photo-img'>
                                <img src={user.cover_photo ? user.cover_photo : userCoverPhoto} 
                                alt={user.first_name} />
                            </div>
                        </div>
                        <div id='profile-picture'>
                            <img src={user.profile_picture ? user.profile_picture : userProfilePicture} 
                                 alt={user.first_name} />
                            <div id='edit-profile-div'>
                                <h4>{user.username ? user.username : user.first_name}</h4>
                                {Number(userId) === sessionUser.id ? 
                                    <OpenModalButton
                                    buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                    modalComponent={<EditUserModal sessionUser={currentUser} />}
                                        />
                                    : null
                                }
                                {sessionUser.id === Number(userId) ? 
                                    null
                                    : <UserFollows sessionUser={currentUser} followedUserId={user.id} />
                                }


                                {Number(userId) !== currentUser.id ? 
                                    <SendRequest sessionUser={currentUser} requestUser={user} />
                                    :
                                    null
                                }
                            </div>
                           
                            
                            
                        </div>
                        <div id='posts-photos'>
                           <div id='active-navlink-div'><NavLink to={`/user/${userId}/posts`}><p>Posts</p></NavLink></div>
                           <div id='active-navlink-div'><NavLink to={`/user/${userId}/photos`}><p>Photos / Videos</p></NavLink></div>
                        </div>
                </div>

                    
                {/* {sessionUser.id === Number(userId) ? 
                <UserFollowsList sessionUser={currentUser} user={user}/>
                    :
                    null
                } */}

               
                
               {sessionUser.id === user.id? 
                    <UserRequests sessionUser={currentUser} />
                    :
                    null
                }              
               
               
                {page === "posts" ? 
                    <UserPosts sessionUser={currentUser} user={user} userPostArr={userPostArr} page={page}/>
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