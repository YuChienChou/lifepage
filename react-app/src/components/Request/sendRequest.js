import { useDispatch, useSelector } from "react-redux";
import {addUserRequestsThunk, deleteUserRequestsThunk, getSingleUserThunk, getUserFollowsThunk, getUserFriendsThunk, getUserRequestsThunk } from "../../store/user"; 
import { useEffect, useState } from 'react';
import friendsIcon from '../resources/friends-icon.png';
import unfriendIcon from '../resources/unfriend-icon.png';
import OpenModalButton from "../OpenModalButton";
import DeleteFriendRelModal from "../Friend/deleteFriendModal";
import './request.css'

export default function SendRequest({sessionUser, requestUser}) {
    const userFollows = useSelector((state) => state.users.userFollows);
    // console.log("userFollow in sendRequest component: ", userFollows);
    const userFriends = useSelector((state) => state.users.userFriends);
    // console.log("user friends in sendRequest component: ", userFriends);
    // const userRequests = useSelector((state) => state.users.userRequests);
    console.log("user request in sendRequest component: ", requestUser.requests);

    const friendRequests = [];
    for (let user of requestUser.requests) {
        friendRequests.push(user.id);
    }

    console.log("friendRequests", friendRequests)

    const [hasSubmit, setHasSubmit] = useState(false);
    const [showRel, setShowRel] = useState(false);

    const dispatch = useDispatch();

    const showRelFun = () => {
        setShowRel(!showRel);
    };

    const hideRelFun = () => {
        setShowRel(false)
    }

    const addRequestFun = async() => {
        await dispatch(addUserRequestsThunk(sessionUser.id, requestUser.id));
        await dispatch(getSingleUserThunk(requestUser.id));
        
        setHasSubmit(true);
    };

    const deleteRequestFun = async () => {
        await dispatch(deleteUserRequestsThunk(requestUser.id, sessionUser.id));
        await dispatch(getSingleUserThunk(requestUser.id));
        setHasSubmit(false)
    }

    useEffect(() => {
        dispatch(getUserFollowsThunk(sessionUser.id));
        dispatch(getUserFriendsThunk(sessionUser.id));
        // dispatch(getUserRequestsThunk(requestUser.id));
    }, [dispatch, sessionUser, requestUser])

    // console.log("friend id list in sendRequest component: ", friendId);

    return (
        <>
        {(() => {
            if(!userFriends[requestUser.id]) {
                return (
                    <>

                    {/* <button id='send-request-button' onClick={addRequestFun}>
                        {hasSubmit ? 
                            "Sent Friend Request"
                            :
                            "Add Friend"
                        }
                    </button> */}
                    {friendRequests.includes(sessionUser.id) ?
                    <><p id='send-request-button' onClick={deleteRequestFun}>Sent Friend Request</p></>
                    :
                    <p id='send-request-button' onClick={addRequestFun}>Add Friend</p>
                    
                    }
                    </>
                ) 
            } else {
                return (
                    <>
                    <div id='friends-div'>
                        <div id='friends'>
                            <img src={friendsIcon} alt="" />
                            <p onClick={showRelFun}>Friends</p>
                        </div>
                    </div>

                    {showRel ? 

                        <div id='show-rel-div' onMouseLeave={hideRelFun}>
                            {/* <button id='follow-rel' onClick={setFollowRelFun} >
                                {userFollows[requestUser.id] ? 
                                    "unfollow"
                                    :
                                    "follow"
                                }
                            </button> */}
                            <img src={unfriendIcon} alt='unfriend icon'/>
                            <OpenModalButton 
                                buttonText="unfriend"
                                modalComponent={<DeleteFriendRelModal sessionUser={sessionUser} requestedUser={requestUser} />} 
                            />
                            {/* <button id='friend-rel' onClick={deleteFriendRelFun}>
                             
                                unfriend
                            </button> */}
                        </div>
                        :
                        null
                    }
                    
                    </>

                )
            }

        })()}
       
        </>
    )
}