import React from 'react';
import { Link } from 'react-router-dom';
//when the page is not found
const NotFound = () => {

	return (
		<div className="bounds">
			<h1>NotFound!</h1>
			<p>Sorry, we could not find the page you're looking for...</p>
			<Link className="button button-secondary" to="/">Return Home</Link>
		</div>
	);

}

export default NotFound;