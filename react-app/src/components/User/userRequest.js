import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { getUserRequestsThunk } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import DeleteUserRequest from "../Request/deleteRequest";
import AddFriend from "../Friend/addFriend";
import './userRequest.css';

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
            <ul id='user-request-ul'>
                {userRequestArr.map((request) => (
                    <li key={request.id} id='user-request-li'>
                        <div id='user-request-link'>
                            <Link to={`/user/${request.id}/posts`}><img src={`${request.profile_picture}`} alt={`${request.username}`}/></Link>
                            <Link to={`/user/${request.id}/posts`}> <p>{request.username}</p></Link>
                        </div>
                        <p>would like to be your friend!</p>
                        <div id='user-request-button-div'>
                            <AddFriend sessionUser={sessionUser} requestUser={request} />
                            <DeleteUserRequest sessionUser={sessionUser} requestUser={request} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}