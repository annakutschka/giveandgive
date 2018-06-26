import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Images from '../../images';
import Input from '../../pices/Input/Input.js';
import Title from '../../pices/Title/Title.js';
import LargeButton from '../../pices/LargeButton/LargeButton.js';
import { Link, History } from 'react-router-dom'
import baseURL from '../../path'


import './Task.css';

export default class Task extends Component {
    constructor(props) {
    	super(props)
	    	this.state = {
                currentUser: '',
                isCreator: false,
	    		editRights: false,
	    		editMode: false,
	    		id: '',
	    		topic_id: '',
		      	title: '',
		      	creator_id: '',
		      	description: '',
		      	location: '',
		      	date: '',
		      	time: '',
		      	status: '',
				creator_name: '',
				creator_email: '',
				helper_id: '',
				helper_points: '',
				loggedIn: false,
		      	accepted: false,
		      	done: false
		    }
		this.editMode = this.editMode.bind(this)
		this.getUser = this.getUser.bind(this)
		this.switchingStateDone = this.switchingStateDone.bind(this)
		this.switchingStateAccepted = this.switchingStateAccepted.bind(this)
		this.giveKarmaPoints = this.giveKarmaPoints.bind(this)
		this.addPoints = this.addPoints.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
	}

 
	componentDidMount() {
        const taskId = this.props.match.params.taskid
        
        axios.get(baseURL + '/users.json')
        .then(response => {
            let user = response.data
            user.forEach(u => {
                if(u.token == sessionStorage.getItem('currentUser')){
                    this.setState({
                        currentUser: u.id
                    })
                }
            })
        })
        .catch(error => console.log(error))
 
		this.setState({
			id: taskId,
		})

	  	axios.get(baseURL + '/api/v1/posts.json')
		  	.then(response => {
			    let taskData = response.data	            
	            taskData.forEach(post => {
	                if(post.id == this.state.id){
	                    this.setState({
	                    	topic_id: post.topic_id,
					      	title: post.title,
					      	creator_id: post.creater_id,
					      	description: post.description,
					      	location: post.location,
					      	date: post.date,
					      	time: post.time,
					      	status: post.state,
					      	helper_id: post.helper_id
						}); 
						this.getUser(post.creater_id);

	                    if(this.state.status == "accepted"){
	                    	this.setState({
	                    		accepted: true
	                    	})
	                    }
	                }
	                if(this.state.creator_id == this.state.currentUser){
	                	this.setState({
							editRights: true
						})
	                }
	                else{
	                    this.setState({
							editRights: false
						})
	                }
			  	})
			});
	}

	handleChange(event){
        const target = event.target;
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
        console.log(name);
        console.log(value);
    }


	getUser(userId){
		axios.get(baseURL + `/users/${userId}.json`)
		  	.then(response => {
			    let userData = response.data
	            this.setState({
					creator_name: userData.name,
					creator_email: userData.email
				}); 
			});
	}

	giveKarmaPoints(){
		axios.get(baseURL + `/users/${this.state.helper_id}.json`)
		  	.then(response => {
			    let userData = response.data
	            this.setState({
					helper_points: userData.karmapoints
				}); 
			});

		//Add Karmapoints to helper
		var points = {
			karmapoints: this.addPoints(this.state.helper_points)
		}

		axios.put(baseURL + `/users/${this.state.helper_id}.json`, points)
		.then(response => {
			this.setState({
				helper_points: points
			});
		})
		.catch(error => console.log(error));
	}

	addPoints(currentPoints){
		//added 5 Points for accepting a task
		const karmapoints = currentPoints + 5;
		return karmapoints;
	}

	switchingStateDone(){
		console.log("trying to change to done.....")
		const taskId = this.state.id;

		var data = {
			state: 'done'
		}

		axios.put(baseURL + `/posts/${taskId}`, data)
        .then(response => {
			this.setState({
				done: true
			});

			//give helper +5 Karma Points
			this.giveKarmaPoints();
        })
        .catch(error => console.log(error))
	}

	switchingStateAccepted(){
		const taskId = this.state.id;

		var data = {
			state: 'accepted',
			helper_id: this.state.currentUser
		}

		axios.put(baseURL + `/posts/${taskId}`, data)
        .then(response => {
			this.setState({
				accepted: true,
				helper_id: this.state.currentUser
			});
        })
        .catch(error => console.log(error))
	}

	deleteTask(){
		const taskId = this.state.id;
		
		axios.delete(baseURL + `/posts/${taskId}`)
		.then(function(response) {
			console.log(response.data);
		})
		.then(function() {
			console.log('deleted: ' + taskId);
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	editMode(){
		this.setState({
			editMode: !this.state.editMode
		})
		if(this.state.editMode){
			const taskId = this.state.id;
			var data = {
				topic_id: this.state.topic_id,
				description: this.state.description,
				location: this.state.location,
				title: this.state.title,
				give_back: this.state.give_back,
				date: this.state.date,
				time: this.state.time

			}
			axios.put(baseURL + `/posts/${taskId}`, data)
			.then(response => {
				this.setState({
					topic_id: this.state.topic,
					description: this.state.description,
					location: this.state.location,
					date: this.state.date,
					title: this.state.title,
					give_back: this.state.give_back,
					time: this.state.time
				});
			})
			.catch(error => console.log(error))

		}
	}

    render() {
	    const path = '/topics/'+ this.state.topic_id +'/'+ this.state.id +'/'+ this.state.creator_id;
	    const BackPath = '/topics/'+ this.state.topic_id;
		const mail = 'mailto:' + this.state.creator_email + 
		'?subject= Accepted: ' + this.state.title + 
		'&body=Hello I ' + this.state.helper_name +
		' accepted your Task: "' +  this.state.title + 
		'"\n with the following description: ' + this.state.description + 
		"\n This Task is located here: " + this.state.location

		let editButton = null;

		if (this.state.editRights && this.state.editMode) {
			editButton = (
				<div className="editIcon" onClick={this.editMode}>
					<img src={Images.accepted}/>
				</div>);
		}
		if (this.state.editRights && !this.state.editMode) {
			editButton = (
				<div className="editIcon" onClick={this.editMode}>
					<img src={Images.edit}/>
				</div>);
		}

		let acceptButton = null;

		if (this.state.editRights && this.state.status == "done"){
			acceptButton=(
				<div className="acceptedFeedback">
	            	<p>Task completed</p>
	            </div>
	        )
		}
		else if (this.state.editRights && this.state.accepted){
			acceptButton=(
				<button className="acceptButton" onClick={this.switchingStateDone}>
	                <p>Set Task Done</p>
	            </button>)
		}
		else if (!this.state.editRights && this.state.status == 'pending'){
			acceptButton=(
				<div className="acceptButtonWrapper">
                	<button className="acceptButton" onClick={this.switchingStateAccepted}>
	                    <a href={mail}><p>Accept Task</p></a>
	                </button>
                </div>)
		}
		else if (!this.state.editRights && this.state.accepted && this.state.helper_id == this.state.currentUser){
			acceptButton=(
				<div className="acceptedFeedback">
	               	<p>Task Accepted</p>
	            </div>)
		}
		else if (this.state.editRights && this.state.status == 'pending'){
			acceptButton=(
				<div className="pendingFeedback">
	               	<p>Not Accepted Yet</p>
	            </div>)
		}
		else{
			acceptButton=(
		        <div className="pendingFeedback">
				    <p>Please reload page...</p>
                </div>
            )
		}
    	return (
	      	<div className="Task">
	      			<div className='headline'>
		                <div className="button_headline">
		                    <Link className="backButton" to={'./.'}> 
		                        <img className="arrow_back" src={Images.backButton} alt="back" onClick={this.props.onClick}/>
		                    </Link>
		                    <h1 className="headlineTask">Task</h1>
		                    {editButton}
		                </div>
		                <hr></hr>
		            </div>
		            {!this.state.editMode &&
		       		 	<div className="taskList">

		       		 		<h3 className="taskTitle">{this.state.title}</h3>

		       		 		<div className="infoWrapper">
			       		 		<h5 className="listTitle">Description:</h5>
			                    <p className="taskValues">{this.state.description}</p>
		                    </div>

		                    <div className="infoWrapper">
		                    	<h5 className="listTitle">Location:</h5>
		                    	<p className="taskValues">{this.state.location}</p>
		                    </div>
							
							<div className="infoWrapper">
								<h5 className="listTitle">Date:</h5>
			                    <p className="taskValues">{this.state.date}</p>
		                    </div>
		                    <div className="infoWrapper">
			                    <h5 className="listTitle">Time:</h5>
			                    <p className="taskValues">{this.state.time}</p>
		                    </div>
		                    {!this.state.editRights &&
			                    <Link className="listTitle" className="linkProfile" to={path} > 
									<div className="infoWrapper" className="creatorList">
										<img className="userIcon" src={Images.userIcon}/>
										<p>{this.state.creator_name}</p>
										<img className="toButton" src={Images.toButton}/>
				                    </div>
			                    </Link>
		                 	}
	                        <div className="infoWrapper">
		                        
				            </div>
			            	{acceptButton}
		                </div>
	            	}
	            	{/* if editMode = true -> you can edit your task */}
	            	{this.state.editMode &&
	            		<div>
							<form id="createEventForm" onSubmit={this.handleSubmit}>
								<p className="titleedit" >Titel</p>
								<div className="formelement">
									<input name="title" value={this.state.title} onChange={this.handleChange} type="text" id="title" placeholder="title" maxLength="50" className="inputfield" required/>
								</div>

								<p className="titleedit" >Description</p>
								<div className="formelement">
									<textarea className="textarea" name="description" placeholder="description" value={this.state.description} className="description" onChange={this.handleChange} id="description" ></textarea>
								</div>

								<p className="titleedit" >Date</p>
								<div className="formelement">
									<input name="date" value={this.state.date} onChange={this.handleChange} type="date" id="date" className="inputfield" required/>
								</div>
								<div className="formelement">
									<input name="time" value={this.state.time} onChange={this.handleChange} type="time" id="time" className="inputfield" required/>
								</div>

								<p className="titleedit" >Give Back</p>
								<div className="formelement">
									<input name="give_back" value={this.state.give_back} onChange={this.handleChange} type="text" id="give_back" placeholder="I want to give you back ..." className="inputfield" required/>
								</div>

								<p className="titleedit" >Location</p>
								<div className="formelement">
									<input name="location" value={this.state.location} onChange={this.handleChange} type="text" id="location" placeholder="location" className="inputfield" required/>
								</div>
								
							</form>
							<div className="deletebutton">
								<Link onClick = {this.deleteTask} to={'./.'}>
									DELETE TASK
								</Link>
							</div>
	            		</div>
	            	}
	      	</div>
    	)
  	}
}
