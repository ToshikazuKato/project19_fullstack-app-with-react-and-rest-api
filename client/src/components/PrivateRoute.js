import React from 'react' ;
import {Route, Redirect} from 'react-router-dom';
import { Consumer } from './Context/UsersContext';

const PrivateRoute = ({ component: Component , path }) => (
	<Route 
		path={path}
		render={(props)=>(
			<Consumer>{ ({user, emailAddress, password, loggedIn}) => (
				user && emailAddress&&password&&loggedIn ? 
				(
					<Component {...props} />
				) 
				: 
				(
					<Redirect to="/courses" />
				)
			)}</Consumer>

		)}
		 />
);

export default PrivateRoute;