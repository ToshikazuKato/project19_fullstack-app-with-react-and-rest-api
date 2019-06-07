import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Consumer } from './Context/UsersContext';
// import { renderers } from 'react-markdown';

class UserSignUp extends Component
{
	state = {
		firstName:'',
		lastName:'',
		emailAddress:'',
		password:'',
		confirmPassword:'',
	};

	handleInput = (e) => {
		e.preventDefault();
		const v = e.target;
		this.setState({
			[v.name] : v.value
		});
		console.log(this.state,'handleinput user info');
	}

	handleSignUp = (e,signin) => {

		e.preventDefault();

		const { firstName,lastName,emailAddress,password,confirmPassword } = this.state;

		if(password!==confirmPassword){
			console.log('password not matched');
			return;
		}else{
			const user = { firstName, lastName, emailAddress, password};
			axios.post("http://localhost:5000/api/users",user)
				.then(res => {
					if (res.status !== 201) {
						console.log(res.status, 'error');
					} else {
						console.log(user, 'the user has been created');
						console.log(signin, 'the user has been created');
						signin(e,{emailAddress,password});
					}
				})
				.catch()
			console.log(this.state, 'signup user info');
		}

	}

	render(){
		return(
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign Up</h1>
					<div>
						<Consumer>{ ({actions}) => (
							<form onSubmit={e => this.handleSignUp(e,actions.signin)}>
								<div>
									<input 
										id="firstName" 
										name="firstName" 
										type="text" 
										className="" 
										placeholder="First Name" 
										onChange={this.handleInput}
										required />
								</div>
								<div>
									<input 
										id="lastName" 
										name="lastName" 
										type="text" 
										className="" 
										placeholder="Last Name" 
										onChange={this.handleInput}
										required />
								</div>
								<div>
									<input 
										id="emailAddress" 
										name="emailAddress" 
										type="text" 
										className="" 
										placeholder="Email Address" 
										onChange={this.handleInput}
										required />
								</div>
								<div>
									<input 
										id="password" 
										name="password" 
										type="password" 
										className="" 
										placeholder="Password" 
										onChange={this.handleInput}
										required />
								</div>
								<div>
									<input 
										id="confirmPassword" 
										name="confirmPassword" 
										type="password" 
										className="" 
										placeholder="Confirm Password" 
										onChange={this.handleInput}
										required />
								</div>
								<div className="grid-100 pad-bottom">
									<button 
										className="button" 
										type="submit">Sign Up
									</button>
									<Link 
										className="button button-secondary" 
										to="/">Cancel
									</Link>
								</div>
							</form>
						)}</Consumer>
					</div>
					<p>&nbsp;</p>
					<p>Already have a user account? 
						<Link to="/signin">Click here</Link> 
					to sign in!</p>
				</div>
			</div>
		);
	}
	
}

export default UserSignUp;