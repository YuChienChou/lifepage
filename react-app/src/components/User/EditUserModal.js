import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editUserThunk, getSingleUserThunk } from "../../store/user";
import { useModal } from "../../context/Modal";


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
        <div>
            <h3>Edit profile</h3>
        </div>

        <form onSubmit={handleSubmit}>
            <label>Phone
                <input 
                    type='text'
                    placeholder='Please enter your phone'
                    value={ phone }
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>
            {validationError.phone ? 
                <div id='error-div'>
                    {validationError.phone && <p>{validationError.phone}</p>}
                </div>
                : null
            }

            <label>Profile picture
                <textarea
                    type="text"
                    placeholder='Please provide img url ends with png, jpg, or jpeg.'
                    value={ profilePicture }
                    onChange={(e) => setProfilePicture(e.target.value)}
                />
            </label>
            {validationError.profilePictureFormat ? 
                <div id='error-div'>
                    {validationError.profilePictureFormat && <p>{validationError.profilePictureFormat}</p>}
                </div>
                : null
            }

            <label>Cover photo
                <textarea
                    type='text'
                    placeholder='Please provide img url ends with png, jpg, or jpeg.'
                    value={ coverPhoto }
                    onChange={(e) => setcoverPhoto(e.target.value)}
                />
            </label>
            {validationError.coverPhotoFormat ? 
                <div id='error-div'>
                    {validationError.coverPhotoFormat && <p>{validationError.coverPhotoFormat}</p>}
                </div>
                : null
            }

            <label>bio
                <textarea
                    type='text'
                    placeholder='Please enter your bio.'
                    value={ bio }
                    onChange={(e) => setBio(e.target.value)}
                />
            </label>
            {validationError.biolength ? 
                <div id='error-div'>
                    {validationError.biolength && <p>{validationError.biolength}</p>}
                </div>
                : null
            }

            <label>Hobbies
                <textarea
                    type='text'
                    placeholder='Please enter your hobbies'
                    onChange={(e) => setHobbies(e.target.value)}
                />
            </label>
            {validationError.hobbylength ? 
                <div id='error-div'>
                    {validationError.hobbylength && <p>{validationError.hobbylength}</p>}
                </div>
                : null
            }

            <button 
                id='edit-user-button'
                disabled={Object.values(validationError).length > 0}
            >
                Edit your info
            </button>
        </form>

        </>
    );
};