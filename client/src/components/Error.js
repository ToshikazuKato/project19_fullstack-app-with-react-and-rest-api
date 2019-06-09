import React from 'react';

const Error = ( {err} ) => {
	console.log(err,'err in Error');
	return (
		<div>
			<h2 className="validation--errors--label">{err.data?'Validation errors':''}</h2>
			<div className="validation-errors">
				<ul>
					<li>{err.data?err.data.message:''}</li>
				</ul>
			</div>
		</div>
	);
}

export default Error;