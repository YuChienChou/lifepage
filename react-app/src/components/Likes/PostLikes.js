

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addUserLikePostThunk, deleteUserLikePostThunk, getAllLikedPostUsersThunk, getAllPostsThunk, getUserLikePostsThunk } from "../../store/post";
import PostLikedUser from './PostLikedUser';
import './like.css'

export default function PostLikes({sessionUser, postId}) {

    // console.log("post id in PostLikes component: ", postId)
    const userLikePosts = useSelector((state) => state.posts.userLikes)
    // console.log("user like posts in PostLikes component: ", userLikePosts[12]);
    const userLikePostArr = Object.values(userLikePosts);
    // console.log("user like post array in PostLikes component: ", userLikePostArr);
    // const postLikeUsers = useSelector((state) => state.posts.likedUsers)
    // console.log("post like users in postlikeduser component: ", postLikeUsers);
    // const postLideUsersArr = Object.values(postLikeUsers)


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
        //    await dispatch(getAllLikedPostUsersThunk(postId));
           await dispatch(getAllPostsThunk());
        
        } else {
            await dispatch(addUserLikePostThunk(payload));
            // await dispatch(getAllLikedPostUsersThunk(postId));
            await dispatch(getAllPostsThunk());
        }

        // await dispatch(getAllLikedPostUsersThunk(postId));
        await dispatch(getUserLikePostsThunk(sessionUser.id));
    };
    
    useEffect(() => {
        dispatch(getAllLikedPostUsersThunk(postId));
        dispatch(getUserLikePostsThunk(sessionUser.id));
        
    }, [dispatch, sessionUser.id, postId]);

    if(!userLikePosts) return null;

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
            {res.includes(postId) ? 
                <p id='like-p'>Like</p>
                :
                <p id='dislike-p'>Like</p>
            }
        </button>

            {/* {userLikePosts[postId] ?  */}
                {/* <PostLikedUser postId={postId} /> */}
                {/* :  */}
                {/* null */}
            {/* } */}
       
        </>
    );
};