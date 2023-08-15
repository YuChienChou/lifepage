import { useSelector, useDispatch } from 'react-redux';
import { addUserLikePostThunk, deleteUserLikePostThunk, getAllPostsThunk, getSinglePostThunk } from "../../store/post";
import { getUserPostsThunk } from '../../store/post';
import './like.css'

export default function PostLikes({sessionUser, postId}) {

    // console.log("post id in PostLikes component: ", postId)
    const userLikePosts = useSelector((state) => state.posts.userLikes)
    // console.log("user like posts in PostLikes component: ", userLikePosts[12]);
    const userLikePostArr = Object.values(userLikePosts);
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
        
        } else {
           await dispatch(addUserLikePostThunk(payload));

        }
        
        await dispatch(getAllPostsThunk());
        await dispatch(getUserPostsThunk(sessionUser.id));
        await dispatch(getSinglePostThunk(postId))
    };

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
            {res.includes(postId) ? 
                <p id='like-p'>Like</p>
                :
                <p id='dislike-p'>Like</p>
            }
        </button>
       
        </>
    );
};