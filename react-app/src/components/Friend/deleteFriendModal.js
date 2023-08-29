import { useDispatch } from "react-redux";
import { deleteUserFriendsThunk } from "../../store/user";
import { useModal } from '../../context/Modal';

export default function DeleteFriendRelModal(sessionUser, requestedUser) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteFriendRelFun = () => {
        dispatch(deleteUserFriendsThunk(sessionUser.id, requestedUser.id));
        closeModal();
    };

    return (
        <>
            <h2>
               Unfriend {requestedUser.username ? requestedUser.username : requestedUser.first_name}?
            </h2>

            <i className="fa-regular fa-circle-xmark" onClick={closeModal()}></i>

            <p>Are you sure you want to remove {requestedUser.username ? requestedUser.username : requestedUser.first_name}?</p>

            <button id='cancel-button'>
                Cancel
            </button>

            <button id='confirm-button' onClick={deleteFriendRelFun}>
                Confirm
            </button>
        </>
    );

};