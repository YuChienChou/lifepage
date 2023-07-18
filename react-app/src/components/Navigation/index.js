import React, { useState} from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
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
				<NavLink id='nav-link' exact to="/user">lifepage</NavLink>
				<img src={sessionUser.profile_picture ? sessionUser.profile_picture : "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80"} alt={sessionUser.firstname} onClick={showInfoFuntion}/>

				{showInfo ? 
					<div id='nav-user-info' onMouseLeave={hideInfoFunction}>
						<Link to={`/user/${sessionUser.id}`}><p>{sessionUser.first_name} {sessionUser.last_name}</p>
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