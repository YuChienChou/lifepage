import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUserFollowsThunk, deleteUserFollowsThunk, getCurrentUserThunk, getUserFollowsThunk } from "../../store/user";
import './userfollows.css';
import { useParams } from "react-router-dom";

export default function UserFollows({sessionUser, followedUserId}) {
    
    // const { userId } = useParams();
    // const userFollows = useSelector((state) => state.users.userFollows);
    // console.log("user follows in create Follow component: ", userFollows);
    // const userFollowsArr = Object.values(userFollows);
    // console.log("user follows array in create follow component: ", userFollowsArr);
    const [showFunDiv, setShowFunDiv] = useState(false);
    const dispatch = useDispatch();
    // console.log("session user follows in UserFollows component: ", sessionUser.follows);

    

    const res = [];

    for (let user of sessionUser.follows) {
        res.push(user.id)
    };

    // console.log("res in userfollows component: ", res);

    const showFun = () => {
        setShowFunDiv(!showFunDiv);
    };

    const UserFollowFun = async () => {

        const followInfo = {
            user1Id : sessionUser.id,
            user2Id : followedUserId
        }

        // if(userFollows[followedUserId]) {
        if(res.includes(followedUserId)) {
            await dispatch(deleteUserFollowsThunk(sessionUser.id, followedUserId));
            await dispatch(getCurrentUserThunk());
            // await dispatch(getUserFollowsThunk(sessionUser.id));
        } else {
            await dispatch(addUserFollowsThunk(sessionUser.id, followedUserId, followInfo));
            // await dispatch(getUserFollowsThunk(sessionUser.id));
            await dispatch(getCurrentUserThunk());
        }

        await dispatch(getUserFollowsThunk(sessionUser.id));
       
    };

    // useEffect(()=> {
    //     dispatch(getUserFollowsThunk(sessionUser.id));
    // }, [dispatch, sessionUser]);

    if(res.length === 0) {
        return (
            <>
            <><p id='not-follow' onClick={UserFollowFun}>Follow</p></>
            </>
        )
    }

    return (
        <>
        <div id='add-user-follow-div'>
            {/* <i className="fa-solid fa-ellipsis" onClick={showFun}></i> */}
            {/* {userFollows[followedUserId] ?  */}
            {res.includes(followedUserId) ? 
            <div>
                {/* <i className="fa-solid fa-square-check"></i> */}
                <p id='following' onClick={UserFollowFun}>Following</p>   
            </div>
                   
                : 
                <p id='not-follow' onClick={UserFollowFun}>Follow</p>      
            }
        </div>

        </>
    )

}