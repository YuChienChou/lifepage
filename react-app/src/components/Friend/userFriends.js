import { Link } from 'react-router-dom';
import './friend.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserFriendsThunk } from '../../store/user';

export default function UserFriends({sessionUser}) {
    const userFriends = useSelector((state) => state.users.userFriends);
    // console.log("user friends in userFriends component: ", userFriends);
    const userFriendsArr = Object.values(userFriends);
    // console.log("user friend list in userFriends component: ", userFriendsArr);
    // console.log("session user friend list in userFriends component: ", sessionUser.friends);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserFriendsThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])

    
    return (
        <>
        {userFriendsArr.length === 0 ? 
            <>
             <div id='friends-container'>
                <h3>Friends</h3>
                <p>You don't have friends yet.</p>
                {/* <p>Let's make new connections!</p> */}
            </div>
            </>
            :
            <>
            <div id='friends-container'>
                <h3>Friends</h3>
                <ul>
                    {userFriendsArr.map((friend) => (
                        <li key={friend.id} id='friends-list'>
                            <Link to={`/user/${friend.id}/posts`}><img src={friend.profile_picture} alt={friend.username ? friend.username : friend.first_name} />
                            {friend.username ? friend.username : friend.first_name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            </>
        }
        </>
    );
};