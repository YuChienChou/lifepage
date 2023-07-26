import { useSelector, useDispatch } from 'react-redux';
import { addUserLikePostThunk, deleteUserLikePostThunk, getAllPostsThunk, getUserLikePostsThunk } from "../../store/post";
import { useEffect } from 'react';
import './like.css'

export default function PostLikes({sessionUser, postId}) {

    console.log("post id in PostLikes component: ", postId)
    const userLikePosts = useSelector((state) => state.posts.userLikes)
    console.log("user like posts in PostLikes component: ", userLikePosts);
    const userLikePostArr = Object.values(userLikePosts);
    console.log("user like post array in PostLikes component: ", userLikePostArr);

    const dispatch = useDispatch();

    const res = [];

    for (let post of userLikePostArr) {
        res.push(post.id);
    }

    const userLikeFun = async (postId) => {

        const payload = {
            user_id: sessionUser.id,
            post_id: postId,
        }


        if(res.includes(postId)) {
           await dispatch(deleteUserLikePostThunk(postId));
           await dispatch(getUserLikePostsThunk(sessionUser.id));
        
        } else {
            await dispatch(addUserLikePostThunk(payload));
            await dispatch(getUserLikePostsThunk(sessionUser.id));
        }
    };

    useEffect(() => {
        dispatch(getUserLikePostsThunk(sessionUser.id));
    }, [dispatch]);

    if(!userLikePostArr) return null;

    return (
        <>
        <button 
            onClick={() => userLikeFun(postId)}
            id={res.includes(postId) ? "like" : "dislike"}
        >
            {res.includes(postId) ? 
                <i className="fa-solid fa-thumbs-up"></i>
                : 
                <i className="fa-regular fa-thumbs-up"></i>
            }
            
        </button>
        </>
    );
};