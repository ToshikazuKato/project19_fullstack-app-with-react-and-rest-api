import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context/UsersContext';
import Error from './Error';
class UserSignIn extends Component
{
	state = {
		emailAddress:'',
		password: '',
		prevPath:'',
	};
	// input event
	handleInput = e => {
		e.preventDefault();
		const v = e.target;
		this.setState({
			[v.name] : v.value
		});
		
	}
	// triggers signin. If err, display err message
	handleSubmit = (e,signin,prevPath) => {
		const event = e;
		e.preventDefault();
		signin(event,this.state,prevPath);
	}

	render(){
		return( 
		<Consumer>{ ({actions,prevPath,err}) =>(
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign In</h1>
					<div>
						{ err ? <Error err={err} /> :"" }
						<form onSubmit={ e => actions.signin(e,this.state,prevPath)} >
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