import React, { useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Navigation.css';
import userProfilePicture from '../resources/default-user-profile-picture.png';

function Navigation(){
	const sessionUser = useSelector((state) => state.session.user);
	const singleUser = useSelector((state) => state.users.singleUser);
	const [showInfo, setShowInfo] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const showInfoFuntion = () => {
		setShowInfo(true)
	};

	const hideInfoFunction = () => {
		setShowInfo(false)
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push('/');
	  };


	return (
		<nav>
			<div id='nav-bar'>
				<Link id='nav-link' exact to="/user">lifepage</Link>
				<img src={sessionUser.profile_picture ? sessionUser.profile_picture : userProfilePicture} alt={sessionUser.firstname} onClick={showInfoFuntion}/>

				{showInfo ? 
					<div id='nav-user-info' onMouseLeave={hideInfoFunction}>
						<Link to={`/user/${singleUser.id}/posts`}><p>{sessionUser.first_name} {sessionUser.last_name}</p>
						<p>{sessionUser.email}</p></Link>
						<button onClick={handleLogout}>
							<i className="fa-solid fa-right-from-bracket"></i>
							Log out
						</button>
					</div> : null
				}
			</div>
		</nav>
	);
}

export default Navigation;