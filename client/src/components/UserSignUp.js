import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Consumer } from './Context/UsersContext';
import Error from './Error';
// import { renderers } from 'react-markdown';

class UserSignUp extends Component
{
	state = {
		firstName:'',
		lastName:'',
		emailAddress:'',
		password:'',
		confirmPassword:'',
		err:{}
	};
	// input event
	handleInput = (e) => {
		e.preventDefault();
		const v = e.target;
		this.setState({
			[v.name] : v.value
		}, () => {
			console.log(this.state, 'from callback');
		});
	}
	// signup logic => if success, it takes a user to previou page
	handleSignUp = (e,signin,prevPath) => {
		e.preventDefault();

		const { firstName,lastName,emailAddress,password,confirmPassword } = this.state;

		if(password!==confirmPassword){
			console.log('password not matched');
			this.setState({
				err:{data:{message:'password not matched'}}
			}, () => {
				console.log(this.state,'from callback npassword not matched');
			});
			return;
		}else{
			const user = { firstName, lastName, emailAddress, password};
			axios.post("http://localhost:5000/api/users",user)
				.then(res => {
					if (res.status !== 201) {
						console.log('can not be happened, chk validation logic');
					} else {
						signin(null,{emailAddress,password},prevPath);
					}
				})
				.catch(err => {
					console.log(err,'err');
					this.setState({
						err:err.response
					});
					if(err.response.status === 500){
						this.props.history.push("/error");
					}
				})
			console.log(this.state, 'signup user info');
		}

	}

	render(){
		return(
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign Up</h1>
					<div>
						<Error err={this.state.err} />
						<Consumer>{ ({actions,prevPath}) => (
							<form onSubmit={e => this.handleSignUp(e,actions.signin,prevPath)}>
								<div>
									<input 
										id="firstName" 
										name="firstName" 
										type="text" 
										className="" 
										placeholder="First Name" 
										onChange={this.handleInput}
									/>
								</div>
								<div>
									<input 
										id="lastName" 
										name="lastName" 
										type="text" 
										className="" 
										placeholder="Last Name" 
										onChange={this.handleInput}
										 />
								</div>
								<div>
									<input 
										id="emailAddress" 
										name="emailAddress" 
										type="text" 
										className="" 
										placeholder="Email Address" 
										onChange={this.handleInput}
										/>
								</div>
								<div>
									<input 
										id="password" 
										name="password" 
										type="password" 
										className="" 
										placeholder="Password" 
										onChange={this.handleInput}
										 />
								</div>
								<div>
									<input 
										id="confirmPassword" 
										name="confirmPassword" 
										type="password" 
										className="" 
										placeholder="Confirm Password" 
										onChange={this.handleInput}
										 />
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