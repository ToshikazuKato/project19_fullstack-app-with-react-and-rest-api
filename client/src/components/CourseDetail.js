import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersContext from './Context/UsersContext';
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
		axios.get("http://localhost:5000/api/courses/" + this.props.match.params.id)
			.then(res => {
				console.log(res,'res');
				const course = res.data.course;
				this.setState({
					course,
					username: course.User.firstName + " " + course.User.lastName
				});
			})
			.catch(err => {
				console.log(err.response,'errstate');

				if(err.response.status === 400){
					this.props.history.push("/notfound");
				}else if (err.response.status === 500){	
					this.props.history.push("/error");
				}

			});
	}

	handleDelete = (e,emailAddress,password,signin) => {
		e.preventDefault();

		axios("http://localhost:5000/api/courses/" + this.props.match.params.id,
		{	method:'DELETE',
			auth:{
				username:emailAddress,
				password:password
			}
		})
		.then(res => {
			console.log(res,'res');
			signin(null,{emailAddress,password});
		})
		.catch(err => {
			console.log(err,'err');

			if(err.response.status === 500 ){
				this.props.history.push("/error");
			}

		});

	}

	render(){

		return(

			<div>
				<div className="actions--bar">
					<div className="bounds">
						<div className="grid-100">
							<UsersContext.Consumer>{ ({user, emailAddress, password, actions}) => (
									( user && (user.id === this.state.course.userId) )? 
									(
										<span>
											<Link className="button" to={"/courses/"+this.state.course.id+"/update"} >Update Course</Link>
											<button className="button" onClick={e => this.handleDelete(e,emailAddress, password, actions.signin)}>Delete Course</button>
										</span>
									)
								:
									(
										<span></span>
									)
							)}</UsersContext.Consumer>
							<Link className="button button-secondary" to="/courses">Return to List</Link>
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