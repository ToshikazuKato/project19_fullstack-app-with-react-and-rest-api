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
import UsersContext from './components/Context/UsersContext';


class App extends Component {
	
	// init state
	state = {
		user: {},
		loggedIn: false,
		password:'',
		emailAddress:''
	}

	handleSignIn = (e,user) => {
		if(e){
			e.preventDefault();
		}
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
						password:user.password,
						emailAddress:user.emailAddress,
					});
					this.props.history.push("/courses");
				} else {
					//return Error
				}

			})
			.catch();
	}

	async handleSignOut(){
		await this.setState({
			user: {},
			loggedIn: false,
			password:'',
			emailAddress: ''
		});
		console.log(this.state,"state? removed user and loggedIn status");
	}

  render(){
  return (
	  <UsersContext.Provider value={{
					user:this.state.user.user,
					loggedIn:this.state.loggedIn,
					password:this.state.password,
					emailAddress:this.state.emailAddress,
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
						<Route exact path="/courses/create" render={ props => <CreateCourse {...props} /> } />
						<Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />} />
						<Route exact path="/courses/:id/update" render={props => <UpdateCourse {...props} />} />
						<Route path="/signin" render={ props => <UserSignIn />} />
						<Route path="/signup" render={props => <UserSignUp />} />
						<Route exact path="/signout" render={() => <Redirect to="/courses" />} />
					</Switch>
				</div>
			</div>
		</div>
	  </UsersContext.Provider>
  );}
}

export default withRouter(App);

