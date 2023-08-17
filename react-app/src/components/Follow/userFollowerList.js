import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserFollowersThunk } from "../../store/user";
import { useParams, Link } from "react-router-dom";


export default function UserFollowers({sessionUser}) {
    const { userId } = useParams();
    const userFollowers = useSelector((state) => state.users.userFollowers);
    // console.log("user followers in userFollowers component: ", userFollowers);
    const userFollowersArr = Object.values(userFollowers);
    // console.log("user followers Arr in userFollowers component: ", userFollowersArr);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserFollowersThunk(sessionUser.id));
    }, [dispatch, sessionUser]);

    
    if(userFollowersArr.length === 0 && sessionUser.id === Number(userId)) {
        return  (
            <>
            <div id="user-follows-container">
                <h3>Peopel following you:</h3>
                <p>You don't have any followers yet.</p>
            </div>
            </>
        )
    } else if(userFollowersArr.length === 0 && sessionUser.id != Number(userId)) {
        return null;
    }


    return (
        <>
             {sessionUser.id === Number(userId) ? 
                <>
                <div id="user-follows-container">
                    <h3>Your followers:</h3>

                    <ul id='user-follows-ul'>
                        {userFollowersArr.map((user) => (
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
    )
}