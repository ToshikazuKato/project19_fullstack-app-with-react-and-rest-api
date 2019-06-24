import React from 'react';
import { Link } from 'react-router-dom';
// internal server error
const UnhandledError = () => {
	return(
		<div className="bounds">
			<h1>ERROR!</h1>
			<p>Sorry, we're not able to handle your request for some reason</p>
			<Link className="button button-secondary" to="/">Return Home</Link>
		</div>
	);

}

export default UnhandledError;