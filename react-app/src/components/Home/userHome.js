import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPostsThunk } from '../../store/post';
import Navigation from '../Navigation';
import OpenModalButton from '../OpenModalButton';
import CreatePost from '../CreatePost/CreatePostModal';


export default function UserHome() {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("logged in user in the userHome page: ", sessionUser);
    const postsStore = useSelector((state) => state.posts.allPosts);
    // console.log("postsStore in the post component: ", postsStore);
    const postsArr = Object.values(postsStore);
    console.log("Post array in the user home component: ", postsArr)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    if(!sessionUser || postsArr.length < 1) return null;

    return (
        <>
        <Navigation />
        <div id='user-home-container'>
            {/* <h1>this is the user landing page</h1> */}
            <div id='userhome-left'>
                <i className="fa-solid fa-house"></i>
                {/* <img src={sessionUser.profile_picture} alt={sessionUser.first_name} /> */}
            </div>
            <div id='userhome-middle'>
                <div>
                    <OpenModalButton
                        buttonText ={`What's on your mind, ${sessionUser.first_name}`}
                        modalComponent={<CreatePost sessionUser={sessionUser}/>}
                    />
                </div>
                {postsArr.reverse().map((post) => (
                    <li id={post.id} className='post-list'>
                        <div id={post.id}>
                            <div id='user-img-name'>
                                <img src={post.User.profile_picture} alt={post.User.first_name} />
                                <p>{post.User.firstname} {post.User.lastname}</p>
                            </div>
                            <div>
                                <p>{post.title}</p>
                                <p>{post.body}</p>
                                <img src={post.img} alt=""/>
                            </div>
                            {/* {post.video ? 
                                <div>
                                    <video controls width='250'>
                                        <source src={post.video} type='video/mp4'></source>
                                    </video>

                                </div> : null
                            
                            } */}
                        </div>
                    </li>
                ))}
            </div>
            <div id='userhome-right'>right div</div>
        </div>
        </>
    )
};