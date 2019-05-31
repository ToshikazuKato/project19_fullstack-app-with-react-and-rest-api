import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';

//App components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

function App() {

	axios.get('http://localhost:5000/api/courses')
	.then(res => {
		console.log(res.data);
	})
	.catch(err=>{
		console.log(err);
	});

  return (
	<div id="root">
		<div>
			{/* <div className="header">
				<div className="bounds">
					<h1 className="header--logo">Courses</h1>
					<nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
				</div>
			</div> */}
			<Header />
			<hr />
				<div className="bounds">
					<Route exact path="/" render={()=> <Redirect to="/courses" />}/>
					<Route exact path="/courses" render={() => <Courses />}/>
					<Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />} />
					<Route path="/courses/create" render={ props => <CreateCourse /> } />
					<Route path="/signin" render={ props => <UserSignIn />} />
					<Route path="/signup" render={props => <UserSignUp />} />
					{/* <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
						<h4 className="course--label">Course</h4>
						<h3 className="course--title">Build a Basic Bookcase</h3>
					</a></div>
					<div className="grid-33"><a className="course--module course--link" href="course-detail.html">
						<h4 className="course--label">Course</h4>
						<h3 className="course--title">Learn How to Program</h3>
					</a></div>
					<div className="grid-33"><a className="course--module course--link" href="course-detail.html">
						<h4 className="course--label">Course</h4>
						<h3 className="course--title">Learn How to Test Programs</h3>
					</a></div>
					<div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
						<h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
							viewBox="0 0 13 13" className="add">
							<polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
						</svg>New Course</h3>
					</a></div> */}
				</div>
			</div>
		</div>
  );
}

export default App;
