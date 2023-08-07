import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { editPostThunk, getSinglePostThunk } from "../../store/post";
import PostLikes from "../Likes/PostLikes";
import CommentList from "../Comments/CommentList";
import CreateComment from "../Comments/CreateComment";
import logo from '../resources/lifepage favicon.png';
import './singlepost.css'


export default function SinglePost() {
    const { postId } = useParams();
    // console.log("page in single post : " , page);
    const sessionUser = useSelector((state) => state.session.user);
    const singlePost = useSelector((state) => state.posts.singlePost);
    // console.log("single post in single post component: ", singlePost);
    const [body, setBody] = useState(singlePost.body);
    // const [img, setImg] = useState(singlePost.img);
    // const [video, setVideo] = useState(singlePost.video);
    const [editPost, setEditPost] = useState(false);
    const dispatch = useDispatch();

    const showEditFun = () => {
        setEditPost(true);
    }

    const editSinglePost = async (e) => {
        e.preventDefault();

        const postInfo = {
            img: singlePost.img,
            video: singlePost.video,
            body,
            user_id : sessionUser.id
        }

        try {
            await dispatch(editPostThunk(singlePost.id, postInfo));
            await dispatch(getSinglePostThunk(singlePost.id))
        } catch (error) {
            console.log(error);
        };

        setEditPost(false)
    };

    useEffect(() => {
        setBody(singlePost.body);
      }, [singlePost.body]);

    useEffect(() => {
        dispatch(getSinglePostThunk(postId));
    }, [dispatch, postId]);

    if (!singlePost.id) {
        return <div>Loading...</div>;
      }

    return (
        <>
        <div id='singlePost-container'>
                <div id='single-post-logo-img'>
                    
                    <div id='single-post-logo'>
                        <div id='x-logo'>
                            <Link to='/user'><i className="fa-solid fa-x"></i></Link>
                        </div>
                        <Link to='/user'><img src={logo} alt='lifepage logo' /></Link>
                    </div>
                    <div id='single-post-img'>
                        <img src={singlePost.img} alt="" />
                    </div>
                </div>
       
                <div id='single-post-content-div'>
                    <div id={singlePost.body.length >= 1000 ? 'single-post-user-info-body-full' : 'single-post-user-info-body'}>
                        <div id={'single-post-user-info'}>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                <img src={singlePost.User.profile_picture} alt={singlePost.User.first_name} />
                            </Link>
                            <Link to={`/user/${singlePost.User.id}/posts`}>
                                {singlePost.User.firstname} {singlePost.User.lastname}
                            </Link>
                        </div>
                        <div id='sp-body'>

                            {(() => {
                                if(singlePost.User.id === sessionUser.id) {

                                        if(editPost === true) {

                                            return (
                                            <>
                                            <form onSubmit={editSinglePost} id='edit-single-post-form'>
                                                <textarea 
                                                    type='text'
                                                    value={body}
                                                    onChange={(e) => setBody(e.target.value)}
                                                />
                                                <button type='submit'>{editPost ? "Save" : "Edit"}</button>
                                            </form>
                                            </>
                                        )
                                    } else {
                                        return  (
                                        <>
                                        <div id='sp-content'>
                                            <p>{singlePost.body}</p>
                                            <button onClick={showEditFun}>Edit</button>
                                        </div>
                                        </>)
                                    }
                                    
                                } else {
                                    return (<p>{singlePost.body}</p>)
                                }
                            }
                            )()}
                         </div>
                         
                    </div>
                    <PostLikes sessionUser={sessionUser} postId={singlePost.id} />

                    <div id={singlePost.body.length >= 1000 ? 'single-post-comment-short' : 'single-post-comment'}>
                        <CommentList sessionUser={sessionUser} post={singlePost}/>
 
                    </div> 
                    <div id='single-post-create-comment'>
                        <CreateComment sessionUser={sessionUser} post={singlePost} />  
                    </div>
            </div>
        </div>
        </>
    )
}