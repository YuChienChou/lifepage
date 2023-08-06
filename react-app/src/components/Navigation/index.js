import React, { useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Navigation.css';
import userProfilePicture from '../resources/default-user-profile-picture.png';
import { getCurrentUserThunk } from '../../store/user';

function Navigation(){
	const sessionUser = useSelector((state) => state.session.user);
	const currentUser = useSelector((state) => state.users.currentUser);
	// console.log("currentUser in Navigation component: ", currentUser);
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

	
	useEffect(() => {
		dispatch(getCurrentUserThunk());
	}, [dispatch])

	if(!currentUser.id) return null;

	return (
		<nav>
			<div id='nav-bar'>
				<Link id='nav-link' to="/user">lifepage</Link>
				<img src={currentUser.profile_picture ? currentUser.profile_picture : userProfilePicture} alt={currentUser.firstname} onClick={showInfoFuntion}/>

				{showInfo ? 
					<div id='nav-user-info' onMouseLeave={hideInfoFunction}>
						<Link to={`/user/${currentUser.id}/posts`}><p>{currentUser.first_name} {currentUser.last_name}</p>
						<p>{currentUser.email}</p></Link>
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