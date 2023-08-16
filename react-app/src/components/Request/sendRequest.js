import { useDispatch } from "react-redux";
import { addUserRequestsThunk } from "../../store/user"; 
import { useState } from 'react';

export default function SendRequest({sessionUser, requestUser}) {
    const [hasSubmit, setHasSubmit] = useState(false);

    const dispatch = useDispatch();

    const addRequestFun = () => {
        dispatch(addUserRequestsThunk(sessionUser.id, requestUser.id));
        setHasSubmit(true)
    };

    console.log("sessionUser friend list: ", sessionUser.friends);

    const friendId = []
    sessionUser.friends.map((friend) => {
        friendId.push(friend.id);
    })

    console.log("friend id list in sendRequest component: ", friendId)

    return (
        <>
        {(() => {
            if(!friendId.includes(requestUser.id)) {
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
                    <p>friends</p>
                    </>

                )
            }

        })()}
       
        </>
    )
}