import React from 'react' ;
import {Route, Redirect} from 'react-router-dom';
import { Consumer } from './Context/UsersContext';
// private routes for components that require authentication. => create, update, delete
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
					<Redirect to="/signin" />
				)
			)}</Consumer>

		)}
		 />
);

export default PrivateRoute;