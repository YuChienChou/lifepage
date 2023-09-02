import { useDispatch } from "react-redux";
import { addUserFriendsThunk, getUserFollowersThunk, getUserFollowsThunk, getUserRequestsThunk } from "../../store/user";


export default function AddFriend({sessionUser, requestUser}) {

    const dispatch = useDispatch();

    const addFriendFun = async () => { 
        await dispatch(addUserFriendsThunk(sessionUser.id, requestUser.id));
        await dispatch(getUserRequestsThunk(sessionUser.id));
        await dispatch(getUserFollowsThunk(sessionUser.id));
        await dispatch(getUserFollowersThunk(sessionUser.id))
    };

    return (
    <>
    <button id='add-friend-button' onClick={addFriendFun}>
        Add Friend
    </button>
    </>
    )
}