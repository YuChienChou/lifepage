import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserPostsThunk } from "../../store/post";
import { useParams, Link } from "react-router-dom";
import { getSingleUserThunk } from "../../store/user";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import CreatePost from "../CreatePost/CreatePostModal";
import EditDeletePostModal from '../EditDeletePost/EditDeletePostModal';
import Comment from "../Comments/Comment";
import PostList from "../PostList/PostList";
import './user.css'


export default function UserPorfile() {
    const { userId } = useParams();
    // console.log("user Id in user profile page: ", userId)
    const user = useSelector((state) => state.users.singleUser);
    // console.log("user in the user profile page: ", user)
    const sessionUser = useSelector((state) => state.session.user)
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
                <Link to='/user'><i className="fa-solid fa-house"></i></Link>
                {/* "<img src={sessionUser.profile_picture} alt={sessionUser.first_name} /> */}
            </div>
            <div id='user-profile-right'>
                    <div id='user-intro'>
                        <div id='cover-photo'>
                            <img src={user.cover_photo} alt={user.first_name} />
                        </div>
                        <div id='profile-picture'>
                            <img src={user.profile_picture} alt={user.first_name} />
                            <h4>{user.first_name} {user.last_name}</h4>
                        </div>
                    <p>Posts</p>
                    <p>Photos</p>
                </div>

                <div id="user-photos">

                </div>


                {/* <div>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.first_name}`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />
                </div>    */}
                <div id='create-post-div'>
                    <Link to={`/user/${sessionUser.id}`}><img src={sessionUser.profile_picture} alt={sessionUser.first_name} /></Link>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.first_name}?`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />
                </div>
            
                {userPostArr.length > 0 ? 
                    <div>
                        {userPostArr.reverse().map((post) => (
                            <PostList sessionUser={sessionUser} post={post} />
                            // <li di={post.id}>
                            //     <div id={post.id}>
                            //     <div>
                            //         <div id='user-img-name'>
                            //             <Link to={`/user/${post.User.id}`}> <img src={post.User.profile_picture} alt={post.User.first_name} />
                            //             <p>{post.User.firstname} {post.User.lastname}</p></Link>
                            //         </div>
                            //         {/* {post.User.id === sessionUser.id ?  */}
                            //             <div>
                            //                 <OpenModalButton
                            //                     buttonText="Edit/Delete"
                            //                     modalComponent={<EditDeletePostModal sessionUser={sessionUser} post={post}/>}
                            //                 />
                            //             </div> 
                            //         {/* // : null } */}
                            //     </div>
                            //     <div>
                            //         <p>{post.title}</p>
                            //         <p>{post.body}</p>
                            //         <img src={post.img} alt=""/>
                            //     </div>
                            //     {/* {post.video ? 
                            //         <div>
                            //             <video controls width='250'>
                            //                 <source src={post.video} type='video/mp4'></source>
                            //             </video>

                            //         </div> : null
                                
                            //     } */}
                            // </div>
                            
                            // <Comment sessionUser={sessionUser} post={post} />
                            
                            // </li>
                        ))}
                    </div> : <p>This user doesn't have any post.</p>
                }  
            
            </div>
        </div>
        </>
    );
};