import { useDispatch, useSelector } from "react-redux";
import { addUserFollowsThunk, addUserFriendsThunk, addUserRequestsThunk, deleteUserFollowsThunk, deleteUserFriendsThunk, getCurrentUserThunk, getUserFollowsThunk, getUserFriendsThunk } from "../../store/user"; 
import { useEffect, useState } from 'react';
import friendsIcon from '../resources/friends-icon.png';
import './request.css'

export default function SendRequest({sessionUser, requestUser}) {
    const userFollows = useSelector((state) => state.users.userFollows);
    // console.log("userFollow in sendRequest component: ", userFollows);
    const userFriends = useSelector((state) => state.users.userFriends);
    // console.log("user friends in sendRequest component: ", userFriends);
    const userRequests = useSelector((state) => state.users.userRequests);
    // console.log("user request in sendRequest component: ", userRequests);


    const [hasSubmit, setHasSubmit] = useState(false);
    const [showRel, setShowRel] = useState(false);

    const dispatch = useDispatch();

    const showRelFun = () => {
        setShowRel(!showRel);
    };

    const addRequestFun = () => {
        dispatch(addUserRequestsThunk(sessionUser.id, requestUser.id));
        setHasSubmit(true)
    };

    // console.log("sessionUser friend list: ", sessionUser.friends);
    // console.log("sessionUser.follows list: ", sessionUser.follows);

    // const friendId = []
    // sessionUser.friends.map((friend) => {
    //     friendId.push(friend.id);
    // });

    // const followId = [];
    // sessionUser.follows.map((follow) => {
    //     followId.push(follow.id)
    // });

    const setFollowRelFun = async () => {
        if(userFollows[requestUser.id]) {
            await dispatch(deleteUserFollowsThunk(sessionUser.id, requestUser.id));
        } else {
            await dispatch(addUserFollowsThunk(sessionUser.id, requestUser.id));
        }

        await dispatch(getUserFollowsThunk(sessionUser.id));
    }

    const deleteFriendRelFun = async () => {
        // if(userFriends[requestUser.id]) {
        //     await dispatch(deleteUserFriendsThunk(sessionUser.id, requestUser.id));
        // } else {
        //     await dispatch(addUserFriendsThunk(sessionUser.id, requestUser.id))
        // }
        await dispatch(deleteUserFriendsThunk(sessionUser.id, requestUser.id));
        await dispatch(getUserFriendsThunk(sessionUser.id));
    }

    useEffect(() => {
        dispatch(getUserFollowsThunk(sessionUser.id));
        dispatch(getUserFriendsThunk(sessionUser.id));
    }, [dispatch, sessionUser])

    // console.log("friend id list in sendRequest component: ", friendId);

    return (
        <>
        {(() => {
            if(!userFriends[requestUser.id]) {
                return (
                    <>

                    <button id='send-request-button' onClick={addRequestFun}>
                        {hasSubmit ? 
                            "Sent Friend Request"
                            :
                            "Add Friend"
                        }
                    </button>
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

                        <div id='show-rel-div'>
                            <button id='follow-rel' onClick={setFollowRelFun} >
                                {userFollows[requestUser.id] ? 
                                    "unfollow"
                                    :
                                    "follow"
                                }
                            </button>
                            <button id='friend-rel' onClick={deleteFriendRelFun}>
                                {/* {userFriends[requestUser.id] ?
                                    "unfriend"
                                    :
                                    "add friend"
                                } */}
                                unfriend
                            </button>
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