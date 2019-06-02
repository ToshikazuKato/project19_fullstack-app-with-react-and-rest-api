import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Consumer} from './Context/UsersContext';
import ReactMarkdown from 'react-markdown';
import { publicDecrypt } from 'crypto';

class UpdateCourse extends Component
{
	state = {
		id: 0,
		title: "",
		description: "",
		estimatedTime: "",
		materialsNeeded: "",
		User:{}
	};
	componentDidMount(){
		axios.get("http://localhost:5000/api/courses/" + this.props.match.params.id)
			.then(res => {
				console.log(res.data);

				this.setState({
					id: res.data.course.id,
					title: res.data.course.title,
					description: res.data.course.description,
					estimatedTime: res.data.course.estimatedTime,
					materialsNeeded: res.data.course.materialsNeeded,
					User: res.data.course.User
				});
				console.log(this.state,'state chk');
			})
			.catch(err=> {
				console.log(err);
			});
	}

	handleInput = e => {
		e.preventDefault();
		const v = e.target.value;
		const n = e.target.name;
		console.log(n,'n');
		this.setState({
			[n] : v
		});
		console.log(this.state);
	}

	handleSubmit = (user, loggedIn) =>{
		console.log(user, loggedIn, 'user and login info');
		console.log(this.state, 'state');
		axios({
			method:'PUT',
			url: "http://localhost:5000/api/courses/" + this.props.match.params.id,
			auth:{
				emailAddress: user.emailAddress,
				password: user.password
			},
			data:{
				title:this.state.title,
				description:this.state.description,
				estimatedTime: this.state.estimatedTime,
				materialsNeeded: this.state.materialsNeeded
			}
		})
		.then( (res) => {
			this.props.history.push("/courses/"+this.props.match.params.id);
		})
		.catch( err=> {
			console.log(err,'fuck');
		});

	}

	render(){
		return(
			<Consumer>{ (user) => (
				<div className="bounds course--detail">
					<h1>Update Course</h1>
					<div>
						<form onSubmit={this.handleSubmit(user.user, user.loggedIn)}>
							<div className="grid-66">
								<div className="course--header">
									<h4 className="course--label">Course</h4>
									<div>
										<input 
											id="title" 
											name="title" 
											type="text" 
											className="input-title course--title--input" 
											defaultValue={this.state.title}
											onChange={this.handleInput} />
									</div>
									<p>By {this.state.User.firstName} {this.state.User.lastName}</p>
								</div>
								<div className="course--description">
									<div>
										<textarea 
											id="description" 
											name="description" 
											className=""
											placeholder={this.state.description}
											defaultValue={this.state.description}
											onChange={this.handleInput}>
										</textarea>
									</div>
								</div>
							</div>
							<div className="grid-25 grid-right">
								<div className="course--stats">
									<ul className="course--stats--list">
										<li className="course--stats--list--item">
											<h4>Estimated Time</h4>
											<div>
												<input 
													id="estimatedTime" 
													name="estimatedTime" 
													type="text" 
													className="course--time--input" 
													defaultValue={this.state.estimatedTime}
													onChange={this.handleInput} />
											</div>
										</li>
										<li className="course--stats--list--item">
											<h4>Materials Needed</h4>
											<div>
												<textarea 
													id="materialsNeeded" 
													name="materialsNeeded" 
													className="" 
													placeholder={this.state.materialsNeeded}
													defaultValue={this.state.materialsNeeded}
													onChange={this.handleInput}>
												</textarea>
											</div>
										</li>
									</ul>
								</div>
							</div>
						<div className="grid-100 pad-bottom">
							<button className="button" type="submit">Update Course</button>
								<button className="button button-secondary"><Link to={"/courses/" + this.props.match.params.id}> Cancel </Link> </button>
						</div>
					</form>
				</div>
			</div>
		)}
		</Consumer>
		);
	}
}

export default UpdateCourse;