import { useDispatch } from "react-redux";
import { deleteUserFriendsThunk } from "../../store/user";
import { useModal } from "../../context/Modal";

export default function DeleteFriendRelModal({sessionUser, requestedUser}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteFriendRelFun = () => {
        dispatch(deleteUserFriendsThunk(sessionUser.id, requestedUser.id));
        closeModal();
    };

    return (
        <>
        <div id='delete-friend-rel-container'>
            <div id="header">
                <h3>
                Unfriend {requestedUser.username ? requestedUser.username : requestedUser.first_name}
                </h3>
                <i className="fa-regular fa-circle-xmark" onClick={closeModal}></i>
            </div>
            <p>Are you sure you want remove {requestedUser.username ? requestedUser.username : requestedUser.first_name} as your friend?</p>
            <div id='friend-rel-buttons'>
                <button id='cancel-delete' onClick={closeModal}>
                    Cancel
                </button>

                <button id='confirm-delete' onClick={deleteFriendRelFun}>
                    Confirm
                </button>
            </div>
        </div>
        </>
    );

};