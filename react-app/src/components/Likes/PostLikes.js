import { useSelector, useDispatch } from 'react-redux';
import { addUserLikePostThunk, deleteUserLikePostThunk, getAllPostsThunk, getSinglePostThunk, getUserLikePostsThunk } from "../../store/post";
import { getUserPostsThunk } from '../../store/post';
import './like.css'
import { useEffect } from 'react';
import { getCurrentUserThunk, getSingleUserThunk } from '../../store/user';

export default function PostLikes({sessionUser, postId, user}) {


    // console.log("post id in PostLikes component: ", postId)
    // const userLikePosts = useSelector((state) => state.posts.userLikes);
    // console.log("user like posts in PostLikes component: ", userLikePosts);
    // const userLikePostArr = Object.values(userLikePosts);
    // console.log("session user likes in PostLikes component: ", sessionUser.likes);
    const dispatch = useDispatch();

    const res = [];
    for (let like of sessionUser.likes) { 
        res.push(like.id)
    };

    // console.log("res in PostLikes component: ", res);

    const userLikeFun = async (postId) => {

        const payload = {
            user_id: sessionUser.id,
            post_id: postId,
        }

        if(res.includes(postId)) {
           await dispatch(deleteUserLikePostThunk(postId));
           
        
        } else {
           await dispatch(addUserLikePostThunk(payload));

        }

        await dispatch(getCurrentUserThunk());
        await dispatch(getAllPostsThunk());
        await dispatch(getUserPostsThunk(user.id));
        await dispatch(getSinglePostThunk(postId));

    };


    useEffect(() => {
        dispatch(getUserLikePostsThunk(sessionUser.id))
    }, [dispatch, sessionUser.id]);

    // if(!userLikePosts) return null;

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

            Like
        </button>
       
        </>
    );
};