import { Link } from 'react-router-dom';
import './friend.css'

export default function UserFriends({sessionUser}) {

    console.log("session user friend list: ", sessionUser.friends)

    
    return (
        <>
        {sessionUser.friends.length === 0 ? 
            <>
                <h3>Contacts</h3>
                <p>You don't have contacts now.</p>
            </>
            :
            <>
            <div id='friends-container'>
                <h3>Contacts</h3>
                <ul>
                    {sessionUser.friends.map((friend) => (
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