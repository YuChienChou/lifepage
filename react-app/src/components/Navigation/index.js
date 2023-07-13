import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showInfo, setShowInfo] = useState(false);

	const showInfoFuntion = () => {
		setShowInfo(true)
	};

	const hideInfoFunction = () => {
		setShowInfo(false)
	};

	return (
		<nav>
			<div>
				<NavLink exact to="/user">lifepage</NavLink>
			</div>
			<img src={sessionUser.profile_picture} alt={sessionUser.firstname} onClick={showInfoFuntion}/>
			{showInfo ? 
			<div onMouseLeave={hideInfoFunction}>
				<p>{sessionUser.first_name} {sessionUser.last_name}</p>
				<p>{sessionUser.email}</p>
				<button>
					Log out
				</button>
			</div> : null
			}
			{/* <div>
				<ProfileButton user={sessionUser} />
			</div> */}
		</nav>
	);
}

export default Navigation;