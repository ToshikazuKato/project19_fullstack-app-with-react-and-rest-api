import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Courses extends Component{

	state ={
		courses:[]
	};
	
	componentDidMount(){
		this.getCourses();
	}

	getCourses = () => {
		axios.get('http://localhost:5000/api/courses')
			.then(res => {
				// console.log(res.data);
				const courses = res.data;
				this.setState(courses);
				console.log(this.state.courses,'sfgste');
			})
			.catch(err => {
				console.log(err);
			});
	}

	render(){
		return(
			this.state.courses.map( (course,index) => {
				return <div className="grid-33" key={index}>
							<a className="course--module course--link" href="course-detail.html">
								<h4 className="course--label">Course</h4>
								<h3 className="course--title">{course.title}</h3>
							</a>
						</div>
			})
		)};
};


export default Courses;