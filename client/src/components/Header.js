import React from 'react';
import { Consumer } from './Context/UsersContext';
import { NavLink,Link } from 'react-router-dom';

const Header = () => {
	return (
		<Consumer>{({ user, loggedIn, actions }) =>(

			<div className="header">
				<div className="bounds">
					<h1 className="header--logo">
						<NavLink to="/courses">Courses</NavLink>
					</h1>
					{ (loggedIn) ? 
						(<nav>
							<span>Welcome {user.user.firstName} {user.user.lastName} !</span>
							<Link className="signout" to="/signout" onClick={actions.signout}>Sign Out</Link>
						</nav>)
						:
						(<nav>
							<NavLink className="signup" to="/signup">Sign Up</NavLink>
							<NavLink className="signin" to="/signin">Sign In</NavLink>
						</nav>)
					}
				</div>
			</div>
		)}
		</Consumer>
	);
}

export default Header;