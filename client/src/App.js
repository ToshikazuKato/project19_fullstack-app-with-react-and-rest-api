import React, { Component } from 'react';
import { Route, Switch, Redirect,withRouter } from "react-router-dom";
import axios from 'axios';

//App components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Provider from './components/Context/UsersContext/Provider';


class App extends Component {
	
	// init state
	state = {
		user: {},
		loggedIn: false,
	}

	handleSignIn = (e, user) => {
		e.preventDefault();
		//Set Authorization header
		axios.get("http://localhost:5000/api/users",
			{
				auth: {
					username: user.emailAddress,
					password: user.password,
				}
			})
			.then(res => {
				if (res.status === 200) {
					const usr = res.data;
					console.log(usr,'usr');
					this.setState({
						user: usr,
						loggedIn: true,
					});
					this.props.history.push("/courses");
				} else {
					//return Error
				}

			})
			.catch();
	}

	handleSignOut = () => {
		this.setState({
			user: {},
			loggedIn: false,
		});
		console.log(this.state);
	}

  render(){
  return (
	  <Provider value={{
					user:this.state.user.user,
					loggedIn:this.state.loggedIn,
					actions:{
						signin:this.handleSignIn.bind(this),
						signout: this.handleSignOut.bind(this)
					}
				}}>
		<div id="root">
			<div>
				<Header />
				<hr />
				<div className="bounds">
					<Switch>
						<Route exact path="/" render={()=> <Redirect to="/courses" />}/>
						<Route exact path="/courses" render={() => <Courses />}/>
						<Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />} />
						<Route path="/courses/:id/update" render={props => <UpdateCourse {...props} />} />
						<Route path="/courses/create" render={ props => <CreateCourse /> } />
						<Route path="/signin" render={ props => <UserSignIn />} />
						<Route path="/signup" render={props => <UserSignUp />} />
					</Switch>
				</div>
			</div>
		</div>
	  </Provider>
  );}
}

export default withRouter(App);

