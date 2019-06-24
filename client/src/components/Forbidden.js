import React from 'react';
import { Link } from 'react-router-dom';

// display forbidden message if a user is not authorized
const Forbidden = () => {

	return (
		<div className="bounds">
			<h1>Forbidden!</h1>
			<p>Sorry, your're not authorized</p>
			<Link className="button button-secondary" to="/">Return Home</Link>
		</div>
	);

}

export default Forbidden;