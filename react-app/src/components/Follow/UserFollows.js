import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUserFollowsThunk, deleteUserFollowsThunk, getUserFollowsThunk } from "../../store/user";
import './userfollows.css';

export default function UserFollows({sessionUser, followedUserId}) {
    const userFollows = useSelector((state) => state.users.userFollows);
    // console.log("user follows in create Follow component: ", userFollows);
    const userFollowsArr = Object.values(userFollows);
    // console.log("user follows array in create follow component: ", userFollowsArr);
    const [showFunDiv, setShowFunDiv] = useState(false);
    const dispatch = useDispatch();

    const res = [];

    for (let user of userFollowsArr) {
        res.push(user.id)
    };

    const showFun = () => {
        setShowFunDiv(!showFunDiv);
    };

    const UserFollowFun = async () => {

        // const followInfo = {
        //     user1Id : sessionUser.id,
        //     user2Id : followedUserId
        // }

        if(res.includes(followedUserId)) {
            await dispatch(deleteUserFollowsThunk(sessionUser.id, followedUserId));
            await dispatch(getUserFollowsThunk(sessionUser.id))
        } else {
            // await dispatch(addUserFollowsThunk(sessionUser.id, followedUserId, followInfo));
            await dispatch(addUserFollowsThunk(sessionUser.id, followedUserId));
            await dispatch(getUserFollowsThunk(sessionUser.id))
        }
       
    };

    useEffect(()=> {
        dispatch(getUserFollowsThunk(sessionUser.id))
    }, [dispatch])

    if(userFollowsArr.length === 0) {
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
            {res.includes(followedUserId) ? 
                <p id='following' onClick={UserFollowFun}>Following</p>      
                : 
                <p id='not-follow' onClick={UserFollowFun}>Follow</p>      
            }
        </div>

        </>
    )

}