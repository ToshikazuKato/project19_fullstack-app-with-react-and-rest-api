import React, { Component} from 'react';
import axios from 'axios';
import { Consumer } from './Context/UsersContext';
import { Link } from 'react-router-dom';

class CreateCourse extends Component {

	state = {
		title: "",
		description: "",
		estimatedTime: "",
		materialsNeeded: "",
	};

	handleInput = (e) => {
		e.preventDefault();
		const n = e.target.name;
		const v = e.target.value;
		this.setState({
			[n]:v
		});
	}

	handleSubmit = (e, emailAddress, password,user,signin) => {
		e.preventDefault();
		if( !this.state.title || !this.state.description ){
			this.showError();
		}else{
			axios("http://localhost:5000/api/courses", {
				method: "POST",
				auth: {
					username: emailAddress,
					password: password
				},
				data: {
					title: this.state.title,
					description: this.state.description,
					estimatedTime: this.state.estimatedTime,
					materialsNeeded: this.state.materialsNeeded,
					userId: user.id,
				}
			})
			.then(res => { 
				console.log(res,'res created');
				signin(null,{emailAddress,password});
			})
			.catch(err => { 
				console.log(err,'err');
			});
		}
		console.log(this.state,'state check');
	}

	showError = () => {
		if(!this.state.title || !this.state.description){
			return (
				<div>
					<h2 className="validation--errors--label">Validation errors</h2>
					<div className="validation-errors">
						<ul>
							{!this.state.title?<li>Please provide a value for "Title"</li>:''}
							{!this.state.description?<li>Please provide a value for "Description"</li>:""}
						</ul>
					</div>
				</div>
			);	
		}else{
			return
		}
	}


	render(){
		return(
			<div className="bounds course--detail">
				<h1>Create Course</h1>
				<div>
				{this.showError()}
				<Consumer>{ ({emailAddress,password,user,actions}) => (

						<form onSubmit={e => this.handleSubmit(e, emailAddress, password, user,actions.signin)}>
							<div className="grid-66">
								<div className="course--header">
									<h4 className="course--label">Course</h4>
									<div>
										<input 
											id="title" 
											name="title" 
											type="text" 
											className="input-title course--title--input" 
											placeholder="Course title..."
											// required
											onChange={this.handleInput} />
									</div>
									<p>By {user.firstName} {user.lastName}</p>
								</div>
								<div className="course--description">
									<div>
										<textarea 
											id="description" 
											name="description" 
											className="" 
											placeholder="Course description..."
											// required
											onChange={this.handleInput}
											>
											
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
													placeholder="Hours" 
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
													placeholder="List materials..."
													onChange={this.handleInput}>
													</textarea>
												</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="grid-100 pad-bottom">
								<button 
									className="button" 
									type="submit">
									Create Course
								</button>
								<Link 
									className="button button-secondary" 
									to={"/courses/"}>
									Cancel
								</Link>
							</div>
						</form>
				
				)}</Consumer>
				
				</div>
      		</div>
		);
	}

}

export default CreateCourse;

