import { useSelector, useDispatch } from 'react-redux';
import { addUserLikePostThunk, deleteUserLikePostThunk, getAllPostsThunk, getSinglePostThunk, getUserLikePostsThunk } from "../../store/post";
import { getUserPostsThunk } from '../../store/post';
import './like.css'
import { useEffect } from 'react';

export default function PostLikes({sessionUser, postId, user}) {

    // console.log("post id in PostLikes component: ", postId)
    const userLikePosts = useSelector((state) => state.posts.userLikes);
    // console.log("user like posts in PostLikes component: ", userLikePosts);
    // const userLikePostArr = Object.values(userLikePosts);
    const dispatch = useDispatch();

    const userLikeFun = async (postId) => {

        const payload = {
            user_id: sessionUser.id,
            post_id: postId,
        }

        if(userLikePosts[postId]) {
           await dispatch(deleteUserLikePostThunk(postId));
        
        } else {
           await dispatch(addUserLikePostThunk(payload));

        }
        
        await dispatch(getAllPostsThunk());
        await dispatch(getUserPostsThunk(user.id));
        await dispatch(getSinglePostThunk(postId));

    };


    useEffect(() => {
        dispatch(getUserLikePostsThunk(sessionUser.id))
    }, [dispatch, sessionUser.id, postId]);

    if(!userLikePosts) return null;

    return (
        <>
        
        <button 
            onClick={() => userLikeFun(postId)}
            id={userLikePosts[postId] ? "like" : "dislike"}
        >
            {userLikePosts[postId] ? 
                <i className="fa-solid fa-thumbs-up"></i>
                : 
                <i className="fa-regular fa-thumbs-up"></i>
            }

            Like
        </button>
       
        </>
    );
};