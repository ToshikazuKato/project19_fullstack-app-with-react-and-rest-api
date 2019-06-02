import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Consumer} from './Context/UsersContext';
import axios from 'axios';

class UserSignIn extends Component
{
	state = {
		emailAddress:'',
		password: '',
	};

	handleInput = e => {
		e.preventDefault();
		const v = e.target;
		this.setState({
			[v.name] : v.value
		});
	}

	render(){
		return( 
		<Consumer>{ ({actions}) =>(
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign In</h1>
					<div>
							
							<form onSubmit={ e => actions.signin(e, this.state)} >
								<div>
									<input id="emailAddress" 
										name="emailAddress"
										type="email" 
										className="" 
										placeholder="Email Address" 
										onChange={this.handleInput}/>
								</div>
								<div>
									<input id="password" 
										name="password" 
										type="password" 
										className="" 
										placeholder="Password" 
										onChange={this.handleInput} />
								</div>
								<div className="grid-100 pad-bottom">
									<button className="button" type="submit">Sign In</button>
									<Link className="button button-secondary" to="/">Cancel</Link>
								</div>
							</form>
					</div>
					<p>&nbsp;</p>
					<p>Don't have a user account? 
					  <Link to="/signup">Click here</Link> 
					  to sign up!
					</p>
				</div>
			</div>
		)}</Consumer>
		 );
	}
}

export default UserSignIn;