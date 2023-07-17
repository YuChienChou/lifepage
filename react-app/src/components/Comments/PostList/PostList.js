// import ReactPlayer from 'react-player/youtube';
// import { Link } from 'react-router-dom';
// import OpenModalButton from '../OpenModalButton';
// import Comment from '../Comments/Comment';
// import EditDeletePostModal from '../EditDeletePost/EditDeletePostModal';



// export default function PostList({sessionUser, post}) {
    
//     return (
//         <>

//         <li key={post.id} className='post-list'>
//             {/* {console.log("post in the for loop: ", post)} */}
//             <div id='post-list-div'>
            
//                     <div id='user-img-name'>
//                         <div id='img-and-link'>
//                             <Link to={`/user/${post.User.id}`}> <img src={post.User.profile_picture} alt={post.User.first_name} /></Link>
//                             <Link to={`/user/${post.User.id}`}>{post.User.firstname} {post.User.lastname}</Link>
//                         </div>

//                         {post.User.id === sessionUser.id ? 
//                             <div id='edit-post-div'>
//                                 <OpenModalButton
//                                     buttonText={<i className="fa-solid fa-ellipsis"></i>}
//                                     modalComponent={<EditDeletePostModal sessionUser={sessionUser} post={post}/>}
//                                 />
//                             </div> : null 
//                         }
//                     </div>
                    
//                 <div id='post-content'>
//                     <div id='content'>
//                         <p>{post.title}</p>
//                         <p>{post.body}</p>
//                     </div>
//                     {post.img? 
//                     <div id='img-post'>
//                     <img src={post.img} alt=""/></div>
//                     : null
//                     }  
//                     {post.video ? 
//                         <div id='video-post'>
//                             <ReactPlayer url={post.video} controls width='100%' height='100%'/>

//                         </div> : null
                
//                     }
//                 </div>
                
//             </div>
//                 <Comment sessionUser={sessionUser} post={post} />
                    
//         </li>
//         </>
//     )
// }