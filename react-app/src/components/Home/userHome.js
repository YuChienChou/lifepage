import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPostsThunk } from '../../store/post';
import Navigation from '../Navigation';


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

    if(postsArr.length < 1) return null;

    return (
        <>
        <Navigation />
        <h1>this is the user landing page</h1>
        {postsArr.map((post) => (
            <li id={post.id}>
                <div id={post.id}>
                    <img src={post.User.profile_picture} alt="" />
                    <p>{post.User.firstname} {post.User.lastname}</p>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    <img src={post.img} />
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
        </>
    )
};