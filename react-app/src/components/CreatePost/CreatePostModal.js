import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { createPostThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import './createpost.css'


export default function CreatePost({sessionUser}) {
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("");
    // const [video, setVideo] = useState("");
    const [body, setBody] = useState("");
    const [validationError, setValidationError] = useState({});
    const [showImgArea, setShowImgArea] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const showImgAreaFun = () => {
        setShowImgArea(!showImgArea)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);

        const postInfo = {
            title,
            img,
            // video,
            body,
            user_id: sessionUser.id,
        }
        await dispatch(createPostThunk(sessionUser.id, postInfo))
        .then(closeModal())
    }

    useEffect(() => {
        const errors = {}
        if(!body) errors.body = "please enter your post";
        if(body.length > 2000) errors.body = "Please enter content less than 2000 characters.";

        setValidationError(errors)
    }, [body]);

    return (
        <>
        <h3>Create Post</h3>
        <div id='create-post-user'>
            <img src={sessionUser.profile_picture} alt={sessionUser.first_name}/>
            <p>{sessionUser.first_name} {sessionUser.last_name}</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type='text' 
                    placeholder="Title for your post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder={`What's on your mind, ${sessionUser.first_name}`}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>

            {showImgArea ? 
                <div>
                    <input 
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        placeholder="Please provide img url."
                    />
                </div> : null
            }

            <div>
                <button 
                    type='submit'
                    disabled={Object.values(validationError).length > 0}
                >
                    Add to your post
                </button>
                <div onClick={showImgAreaFun}>
                    <i className="fa-solid fa-photo-film"></i>
                </div>
            </div>
        </form>

        </>
    )
}