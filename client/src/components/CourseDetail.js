import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component{

	state = {
		course:{},
		username:""
	};

	componentDidMount(){
		this.getCourseDetail();
	}

	getCourseDetail = () => {
		console.log(this.props.match.url,'what');
		axios.get("http://localhost:5000/api" + this.props.match.url)
			.then(res => {
				const course = res.data.course;
				this.setState({
					course,
					username: course.User.firstName + " " + course.User.lastName
				});
				console.log(course, 'sfgste');
			})
			.catch(err => {
				console.log(err);
			});
	}

	render(){
		return(

			<div>
				<div className="actions--bar">
					<div className="bounds">
						<div className="grid-100">
							<span>
								<a className="button" href="update-course.html">Update Course</a>
								<a className="button" href="#">Delete Course</a>
							</span>
							<a className="button button-secondary" href="index.html">Return to List</a>
						</div>
					</div>
				</div>
				<div className="bounds course--detail">
					<div className="grid-66">
						<div className="course--header">
							<h4 className="course--label">Course</h4>
							<h3 className="course--title">{this.state.course.title}</h3>
							<p>By {this.state.username} </p>
						</div>
						<div className="course--description">
							<ReactMarkdown source={this.state.course.description} />
						</div>
					</div>
					<div className="grid-25 grid-right">
						<div className="course--stats">
							<ul className="course--stats--list">
								<li className="course--stats--list--item">
									<h4>Estimated Time</h4>
									<h3>{this.state.course.estimatedTime}</h3>
								</li>
								<li className="course--stats--list--item">
									<h4>Materials Needed</h4>
									<ul>
										<ReactMarkdown source={this.state.course.materialsNeeded} />
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

		);
	}

}

export default CourseDetail;