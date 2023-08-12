import { useDispatch } from "react-redux";
import { addUserFriendsThunk, getUserRequestsThunk } from "../../store/user";


export default function AddFriend({sessionUser, requestUser}) {

    const dispatch = useDispatch();

    const addFriendFun = () => { 
        dispatch(addUserFriendsThunk(sessionUser.id, requestUser.id));
        dispatch(getUserRequestsThunk(sessionUser.id));
    };

    return (
    <>
    <button id='add-friend-button' onClick={addFriendFun}>
        Add Friend
    </button>
    </>
    )
}