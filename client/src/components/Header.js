import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div className="header">
			<div className="bounds">
				<h1 className="header--logo">
					<NavLink to="/courses">Courses</NavLink>
				</h1>
				<nav>
					<NavLink className="signup" to="/signup">Sign Up</NavLink>
					<NavLink className="signin" to="/signin">Sign In</NavLink>
				</nav>
			</div>
		</div>
	);
}

export default Header;