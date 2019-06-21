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
import PrivateRoute from './components/PrivateRoute';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';


class App extends Component {
	
	// init state
	state = JSON.parse(window.sessionStorage.getItem('user')) ? 
			JSON.parse(window.sessionStorage.getItem('user')) :
			 {
				user: {},
				loggedIn: false,
				password: '',
				emailAddress: '',
				prevPath: '',
				err: {}
			};

	handleSignIn = (e,user,from) => {
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
						err:{}
					});
					window.localStorage.setItem('user',JSON.stringify({
						user: usr,
						loggedIn: true,
						password:user.password,
						emailAddress:user.emailAddress,
						err:{}
					}));
					this.props.history.push(from);
				} else {
					//return Error
					this.props.history.push("/notfound");
				}

			})
			.catch(err => {
				if(err.response.status===401){
					//login failed
					this.setState({
						err:err.response
					});
					console.log(this.state,'401');
				} else if (err.response.status === 500) {
					//server error
					this.props.history.push("/error");
				}else{
					// something else
					this.props.history.push("/error");
				}
			});
	}

	async handleSignOut(){
		await this.setState({
			user: {},
			loggedIn: false,
			password:'',
			emailAddress: '',
			prevPath:'',
			err:{}
		});
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.location !== this.props.location) {
			await this.setState({ prevPath: this.props.location.pathname,err:{} })
		}
		console.log(this.state,'chk');
	}

  render(){
  return (
	  <UsersContext.Provider value={{
					user:this.state.user.user,
					loggedIn:this.state.loggedIn,
					password:this.state.password,
					emailAddress:this.state.emailAddress,
					prevPath:this.state.prevPath,
					err:this.state.err,
					actions:{
						signin:this.handleSignIn.bind(this),
						signout: this.handleSignOut.bind(this)
					}
				}}>
		<div id="root">
			<div>
				<Header props={this.props}/>
				<hr />
				<div className="bounds">
					<Switch>
						<Route exact path="/" render={()=> <Redirect to="/courses" />}/>
						<Route exact path="/courses" render={() => <Courses />}/>
						<PrivateRoute exact path="/courses/create" component={CreateCourse}  />
						<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
						<Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />} />
						<Route exact path="/signin" render={ (props) => <UserSignIn {...props} />} />
						<Route exact path="/signup" render={ () => <UserSignUp />} />
						<Route exact path="/signout" render={() => <Redirect to="/courses" />} />
						<Route exact path="/error" component={UnhandledError} />
						<Route exact path="/forbidden" component={Forbidden} />
						<Route exact path="/notfound" component={NotFound} />
						<Route render={() => <NotFound />} />
					</Switch>
				</div>
			</div>
		</div>
	  </UsersContext.Provider>
  );}
}

export default withRouter(App);

