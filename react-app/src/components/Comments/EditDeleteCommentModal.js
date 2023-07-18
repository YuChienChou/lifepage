// import { useDispatch } from "react-redux";
// import { deleteCommentThunk } from "../../store/comment";
// import { useModal } from "../../context/Modal";
// import OpenModalButton from "../OpenModalButton";
// import { getAllPostsThunk, getUserPostsThunk } from "../../store/post";
// import EditComment from "./EditComment";

// export default function EditDeleteCommentModal({sessionUser, post, comment}) {
//     // console.log("session user in edit delete comment component: ", sessionUser);
//     // console.log("comment in edit delete comment component: ", comment);
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();

//     const deleteComment = async () => {
//         await dispatch(deleteCommentThunk(comment.id));
//         await dispatch(getAllPostsThunk());
//         await dispatch(getUserPostsThunk(sessionUser.id));
//         closeModal();
//     };

//     return (
//         <>
//         <div id='edit-delete-comment-container'>
//             <div id='edit-comment'>
//                 <p>Edit comment</p>
//                 <OpenModalButton
//                     buttonText='Edit comment'
//                     modalComponent={<EditComment sessionUser={sessionUser} post={post} comment={comment}/>}
//                 />
//             </div>
//             <div id='delete-comment'>
//                 <i className="fa-regular fa-trash-can" onClick={deleteComment}></i>
//                 <p>Move to trash</p>
//             </div>
//         </div>
//         </>
//     );
// };