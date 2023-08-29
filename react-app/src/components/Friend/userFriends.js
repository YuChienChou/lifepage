import { Link } from 'react-router-dom';
import './friend.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserFriendsThunk } from '../../store/user';

export default function UserFriends({sessionUser}) {
    const userFriends = useSelector((state) => state.users.userFriends);
    console.log("user friends in userFriends component: ", userFriends);
    const userFriendsArr = Object.values(userFriends);
    console.log("user friend list in userFriends component: ", userFriendsArr);
    console.log("session user friend list in userFriends component: ", sessionUser.friends);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserFriendsThunk(sessionUser.id))
    }, [dispatch, sessionUser.id])

    
    return (
        <>
        {userFriendsArr.length === 0 ? 
            <>
                <h3>Contacts</h3>
                <p>You don't have contacts now.</p>
            </>
            :
            <>
            <div id='friends-container'>
                <h3>Contacts</h3>
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