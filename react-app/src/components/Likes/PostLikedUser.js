// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllLikedPostUsersThunk } from "../../store/post";


// export default function PostLikedUser({postId}) {
//     console.log(
//     "post id in post like user component: ", postId
//     )
//     const postLikeUsers = useSelector((state) => state.posts.likedUsers)
//     // console.log("post like users in postlikeduser component: ", postLikeUsers);
//     const postLikedUsersArr = Object.values(postLikeUsers);
//     console.log("postLikedUserArr: ", postLikedUsersArr)

//     const dispatch = useDispatch();

//     // dispatch(getAllLikedPostUsersThunk(postId))

//     useEffect(() => {
//         dispatch(getAllLikedPostUsersThunk(postId))
//     }, [dispatch, postId]);

//     // if(!postLikeUsers) return null;
//     if(postLikedUsersArr.length === 0) {
//         return (
//             <>
//             <p>Be the first to like this post!</p>
//             </>
//         )
//     }

//     return (
//         <>
//             <p>{postLikedUsersArr.length} people like this post.</p>
//         </>
//     );
// };