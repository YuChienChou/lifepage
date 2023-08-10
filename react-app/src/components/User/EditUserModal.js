import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { editUserInfoThunk, editUserProfilePictureThunk, editUserCoverPhotoThunk,getCurrentUserThunk, getSingleUserThunk } from "../../store/user";
import { useModal } from "../../context/Modal";
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './edituser.css'


export default function EditUserModal({sessionUser}) { 
    const [username, setUsername] = useState(sessionUser.username);
    const [phone, setPhone] = useState(sessionUser.phone);
    const [bio, setBio] = useState(sessionUser.bio ? sessionUser.bio : "");
    const [hobbies, setHobbies] = useState(sessionUser.hobbies ? sessionUser.hobbies : "");
    const [profilePicture, setProfilePicture] = useState('');
    // console.log("sessionuser profile picture in EditUserModal: ", sessionUser.profile_picture)
    // console.log("profiel picture in EditUserModal: ", profilePicture);
    const [coverPhoto, setCoverPhoto] = useState('');
    // console.log("sessionuser cover photo in EditUserModal: ", sessionUser.cover_photo)
    // console.log("coverPhoto in EditUserModal: ", coverPhoto);
    const [validationError, setValidationError] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(profilePicture) {
            const userInfo = new FormData();
            userInfo.append("username", username);
            userInfo.append("phone", phone);
            userInfo.append("bio", bio);
            userInfo.append("hobbies", hobbies);
            userInfo.append("profile_picture", profilePicture);
            // userInfo.append("cover_photo", sessionUser.cover_photo);

            await dispatch(editUserProfilePictureThunk(userInfo));
            await dispatch(getCurrentUserThunk());
            await dispatch(getSingleUserThunk(sessionUser.id))
            closeModal();
        } 
        if(coverPhoto) {
            const userInfo = new FormData();
            userInfo.append("username", username);
            userInfo.append("phone", phone);
            userInfo.append("bio", bio);
            userInfo.append("hobbies", hobbies);
            // userInfo.append("profile_picture", sessionUser.profile_picture);
            userInfo.append("cover_photo", coverPhoto);

            await dispatch(editUserCoverPhotoThunk(userInfo));
            await dispatch(getCurrentUserThunk());
            await dispatch(getSingleUserThunk(sessionUser.id))
            closeModal();
        } 

        if(!profilePicture && !coverPhoto) {
            const userInfo = {
                username: username,
                phone: phone,
                bio: bio,
                hobbies: hobbies,
                // profile_picture: sessionUser.profile_picture,
                // cover_photo: sessionUser.cover_photo,
            }

            await dispatch(editUserInfoThunk(userInfo));
            await dispatch(getCurrentUserThunk());
            await dispatch(getSingleUserThunk(sessionUser.id))
            closeModal();
        }

    }


    useEffect(() => {
        const errors = {};
        if(phone && phone.length > 10) errors.phone = "Please enter valid phone number.";
        if(bio && bio.length > 500) errors.biolength = "Please enter your bio within 500 characters."
        if(hobbies && hobbies.length > 300) errors.hobbylength = "Please enter your hobbies within 300 characters."
        if(profilePicture && 
           !profilePicture["name"].endsWith('.jpg') && 
           !profilePicture["name"].endsWith('.png') && 
           !profilePicture["name"].endsWith('.jpeg')) 
           errors.profilePictureFormat = "Image URL needs to end in png or jpg (or jpeg)";
        if(coverPhoto && 
           !coverPhoto["name"].endsWith('.jpg') && 
           !coverPhoto["name"].endsWith('.png') && 
           !coverPhoto["name"].endsWith('.jpeg')) 
           errors.coverPhotoFormat = "Image URL needs to end in png or jpg (or jpeg)";

        setValidationError(errors);
    }, [phone, bio, hobbies, profilePicture, coverPhoto])

    useEffect(() => {
        dispatch(getSingleUserThunk(sessionUser.id));
    }, [dispatch])

    return (
        <>
        <div id='edit-user-container'>
            <h3>Edit profile</h3>
        </div>

        <div id='create-post-user'>
           <Link to={`/user/${sessionUser.id}/posts`}><img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} 
            alt={sessionUser.first_name}/></Link>
            <Link to={`/user/${sessionUser.id}/posts`}>{sessionUser.first_name} {sessionUser.last_name}</Link>
        </div>

        <form id='edit-user-form' onSubmit={handleSubmit} encType="multipart/form-data">
            <div id='edit-user-phone'>
                <div>
                    <i className="fa-solid fa-user">user name</i>
                    <input 
                        type='text'
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {validationError.phone ? 
                    <div id='error-div'>
                        {validationError.phone && <p>{validationError.phone}</p>}
                    </div>
                    : null
                }
            </div>
            <div id='edit-user-phone'>
                <div>
                    <i className="fa-solid fa-phone">Phone</i>
                    <input 
                        type='text'
                        value={ phone }
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {validationError.phone ? 
                    <div id='error-div'>
                        {validationError.phone && <p>{validationError.phone}</p>}
                    </div>
                    : null
                }
            </div>
         

            <div id="edit-user-profile-picture">
                <div>
                    
                    <i className="fa-solid fa-image-portrait">Profile picture</i>
                    <div id="edit-user-info-images-div">
                        <img src={sessionUser.profile_picture} alt={sessionUser.username} />
                        <input
                            type="file"
                            onChange={(e) => setProfilePicture(e.target.files[0])}
                        />
                    </div>
                </div>

                {validationError.profilePictureFormat ? 
                    <div id='error-div'>
                        {validationError.profilePictureFormat && <p>{validationError.profilePictureFormat}</p>}
                    </div>
                    : null
                }
            </div>
            

            <div id='edit-user-cover-photo'>
                <div> 
                    <i className="fa-solid fa-image">Cover photo</i>
                    <div id="edit-user-info-images-div">
                        <img src={sessionUser.cover_photo} alt={sessionUser.username} />
                        <input
                            type='file'
                            onChange={(e) => setCoverPhoto(e.target.files[0])}
                        />
                    </div>
                </div>

                {validationError.coverPhotoFormat ? 
                    <div id='error-div'>
                        {validationError.coverPhotoFormat && <p>{validationError.coverPhotoFormat}</p>}
                    </div>
                    : null
                }
            </div>
            

            <div id='edit-user-bio'>
                <div>
                    <i className="fa-solid fa-book">Bio</i>
                    <textarea
                        type='text'
                        value={ bio }
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                {validationError.biolength ? 
                <div id='error-div'>
                    {validationError.biolength && <p>{validationError.biolength}</p>}
                </div>
                : null
            }
            </div>
            

            <div id='edit-user-hobbies'>
                <div>
                <i className="fa-solid fa-face-kiss-wink-heart">Hobbies</i>
                <textarea
                    type='text'
                    value={ hobbies }
                    onChange={(e) => setHobbies(e.target.value)}
                /></div>

                {validationError.hobbylength ? 
                    <div id='error-div'>
                        {validationError.hobbylength && <p>{validationError.hobbylength}</p>}
                    </div>
                    : null
                }
            </div>
            

            <button 
                disabled={Object.values(validationError).length > 0}
                id={Object.values(validationError).length > 0 ? 
                'edit-user-button-disabled' : 'edit-user-button-active'
                }
            >
                Edit your info
            </button>
        </form>

        </>
    );
};