import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { editUserThunk, getSingleUserThunk, getAllUsersThunk } from "../../store/user";
import { useModal } from "../../context/Modal";
import userProfilePicture from '../resources/default-user-profile-picture.png';
import './edituser.css'


export default function EditUserModal({sessionUser}) {
    
    const [phone, setPhone] = useState(sessionUser.phone);
    const [bio, setBio] = useState(sessionUser.bio);
    const [hobbies, setHobbies] = useState(sessionUser.hobbies);
    const [profilePicture, setProfilePicture] = useState(sessionUser.profile_picture);
    const [coverPhoto, setcoverPhoto] = useState(sessionUser.cover_photo );
    const [validationError, setValidationError] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userInfo = {
            user_id : sessionUser.id,
            phone,
            bio,
            hobbies,
            profile_picture: profilePicture,
            cover_photo: coverPhoto,
        };

        try {
            await dispatch(editUserThunk(sessionUser.id, userInfo));
            await dispatch(getSingleUserThunk(sessionUser.id));
            // await dispatch(getAllUsersThunk());

            closeModal();
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const errors = {};
        if(phone && phone.length > 10) errors.phone = "Please enter valid phone number.";
        if(bio && bio.length > 1000) errors.biolength = "Please enter your bio within 1000 characters."
        if(hobbies && hobbies.length > 500) errors.hobbylength = "Please enter your hobbies within 500 characters."
        if(profilePicture && !profilePicture.endsWith('.jpg') && !profilePicture.endsWith('.png') && !profilePicture.endsWith('.jpeg')) errors.profilePictureFormat = "Image URL needs to end in png or jpg (or jpeg)";
        if(coverPhoto && !coverPhoto.endsWith('.jpg') && !coverPhoto.endsWith('.png') && !coverPhoto.endsWith('.jpeg')) errors.coverPhotoFormat = "Image URL needs to end in png or jpg (or jpeg)";

        setValidationError(errors);
    }, [phone, bio, hobbies, profilePicture, coverPhoto])

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

        <form id='edit-user-form' onSubmit={handleSubmit}>
            {/* <div id='edit-user-phone'>
                <div>
                    <i className="fa-solid fa-phone">Phone</i>
                    <input 
                        type='text'
                        placeholder='Please enter your phone'
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
          */}

            <div id="edit-user-profile-picture">
                <div>
                    <i className="fa-solid fa-image-portrait">Profile picture</i>
                    <textarea
                        type="text"
                        placeholder='Please provide img url ends with png, jpg, or jpeg.'
                        value={ profilePicture }
                        onChange={(e) => setProfilePicture(e.target.value)}
                    />
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
                    <textarea
                        type='text'
                        placeholder='Please provide img url ends with png, jpg, or jpeg.'
                        value={ coverPhoto }
                        onChange={(e) => setcoverPhoto(e.target.value)}
                    />
                </div>

                {validationError.coverPhotoFormat ? 
                    <div id='error-div'>
                        {validationError.coverPhotoFormat && <p>{validationError.coverPhotoFormat}</p>}
                    </div>
                    : null
                }
            </div>
            

            {/* <div id='edit-user-bio'>
                <div>
                    <i className="fa-solid fa-book">Bio</i>
                    <textarea
                        type='text'
                        placeholder='Please enter your bio.'
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
                    placeholder='Please enter your hobbies'
                    onChange={(e) => setHobbies(e.target.value)}
                /></div>

                {validationError.hobbylength ? 
                    <div id='error-div'>
                        {validationError.hobbylength && <p>{validationError.hobbylength}</p>}
                    </div>
                    : null
                }
            </div>
             */}

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