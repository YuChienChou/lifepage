import { useDispatch, useSelector } from "react-redux";
import { getUserFollowsThunk } from "../../store/user";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function UserFollowsList({sessionUser}) {
    // console.log("session user if in userFollowList: ", sessionUser.id)
    const {userId} = useParams();
    // console.log("user Id in user follows list component: ", userId)
    const userFollowsStore = useSelector((state) => state.users.userFollows);
    const userFollowsArr = Object.values(userFollowsStore);
    // console.log("user follows list in userFollowList component: ", userFollowsArr);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserFollowsThunk(sessionUser.id));
        // dispatch(getSingleUserThunk(user.id));
    }, [dispatch, sessionUser]);


    if(userFollowsArr.length === 0 && sessionUser.id === Number(userId)) {
        return  (
            <>
            <div id="user-follows-container">
                <h3>Peopel you're following:</h3>
                <p>You're not following any people here.</p>
            </div>
            </>
        )
    } else if(userFollowsArr.length === 0 && sessionUser.id != Number(userId)) {
        return null;
    }

    return (
        <>
        
            {sessionUser.id === Number(userId) ? 
                <>
                <div id="user-follows-container">
                    <h3>Peopel you're following:</h3>

                    <ul id='user-follows-ul'>
                        {userFollowsArr.map((user) => (
                            <li key={user.id} id='user-follows-li'>
                                <Link to={`/user/${user.id}/posts`}><img src={user.profile_picture} alt={user.username} />
                                {user.username}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                </>
                :
                null
            }
        
        </>
    );
};