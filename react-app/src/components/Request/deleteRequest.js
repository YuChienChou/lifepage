import { useDispatch } from "react-redux";
import { deleteUserRequestsThunk } from "../../store/user";

export default function DeleteUserRequest({sessionUser, requestUser}) {
    const dispatch = useDispatch();

    const deleteRequestFun = () => {
        console.log("deleteRequestFun is invoked!!")
        dispatch(deleteUserRequestsThunk(sessionUser.id, requestUser.id))
    }

    return (
    <>
    <button id='delete-request-button' onClick={deleteRequestFun}>
        Decline
    </button>
    </>
    )
}