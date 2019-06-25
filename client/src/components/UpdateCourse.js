import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Consumer } from './Context/UsersContext';
import Error from './Error';
class UpdateCourse extends Component
{
	state = {
		id: 0,
		title: "",
		description: "",
		estimatedTime: "",
		materialsNeeded: "",
		userId :'',
		User:{},
		err:{},
	};

	componentDidMount(){
		this.getCourse();
	}
	// get request course by id
	getCourse = () => {
		axios.get("http://localhost:5000/api/courses/" + this.props.match.params.id)
			.then(res => {
				const {user} = JSON.parse(window.sessionStorage.getItem('user'));
				if(res.data.course.userId === user.user.id){
					this.setState({
						id: res.data.course.id,
						title: res.data.course.title,
						description: res.data.course.description,
						estimatedTime: res.data.course.estimatedTime,
						materialsNeeded: res.data.course.materialsNeeded,
						userId: res.data.course.userId,
						User: res.data.course.User
					});
				}else{
					this.props.history.push("/forbidden");
				}
			})
			.catch(err => {
				if (err.response.status === 400) {
					this.props.history.push("/notfound");
				} else if (err.response.status === 500) {
					this.props.history.push("/error");
				} else if (err.response.status === 403){
					this.props.history.push("/forbidden");
				}
				this.setState({
					err: err.response
				});
			});
	}

	// input event
	handleInput = e => {
		e.preventDefault();
		const v = e.target.value;
		const n = e.target.name;
		console.log(v,n,'vnvnvnvnv')
		this.setState({
			[n] : v
		}, () => {
			console.log(this.state, 'from callback');
		});
		console.log(this.state,'handleInput');
	}
	// update a course
	handleSubmit = (e,user,emailAddress,password,loggedIn) =>{
		e.preventDefault();
		console.log(e, user, emailAddress, password, loggedIn, 'params');
		console.log(this.state,'state chk');
		// basic validation
		if(!loggedIn || user.id !== this.state.userId || this.state.id === 0){
			return;
		}
		axios(`http://localhost:5000/api/courses/${this.props.match.params.id}`,
			{
				method:'PUT',
				auth : {
					username: emailAddress,
					password: password
				},
				data:{
					id: this.state.id,
					title:this.state.title,
					description:this.state.description,
					estimatedTime: this.state.estimatedTime,
					materialsNeeded: this.state.materialsNeeded
				}
			})
			.then( res => {
				// after successfully updated course, render course details
				this.props.history.push("/courses/"+this.props.match.params.id);
			})
			.catch( err=> {
				this.setState({
					err: err.response
				});
				if(err.response.status === 500){
					this.props.history.push("/error");
				}
			});
	}

	render(){
		return(
			<Consumer>{ ({user,emailAddress,password,loggedIn,actions}) => (
				<div className="bounds course--detail">
					<h1>Update Course</h1>
					<div>
						<Error err={this.state.err} />
						<form onSubmit={ e => this.handleSubmit(e, user,emailAddress,password, loggedIn, actions.signout)}>
							<div className="grid-66">
								<div className="course--header">
									<h4 className="course--label">Course</h4>
									<div>
										<input 
											id="title" 
											name="title" 
											type="text" 
											className="input-title course--title--input" 
											value={this.state.title || ''}
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
											value={this.state.description || ''}
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
													value={this.state.estimatedTime || ''}
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
													value={this.state.materialsNeeded || ''}
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