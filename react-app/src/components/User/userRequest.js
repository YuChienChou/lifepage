import { useEffect } from "react";
import { getUserRequestsThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import DeleteUserRequest from "../Request/deleteRequest";
import AddFriend from "../Friend/addFriend";


export default function UserRequests ({sessionUser}) {
    const userRequestsStore = useSelector((state) => state.users.userRequests);
    const userRequestArr = Object.values(userRequestsStore);
    console.log("userRequestArr in userRequeset component", userRequestArr);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUserRequestsThunk(sessionUser.id))
    }, [dispatch, sessionUser]);

    if(userRequestArr.length === 0) return null;

    return (
        <>
        <div id='user-request-container'>
            <ul>
                {userRequestArr.map((request) => (
                    <li key={request.id}>
                        <p>{request.username} would like to be your friend!</p>
                        <AddFriend sessionUser={sessionUser} requestUser={request} />
                        <DeleteUserRequest sessionUser={sessionUser} requestUser={request} />
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}