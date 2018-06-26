import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Images from '../../images';
import Input from '../../pices/Input/Input.js'
import { Link } from 'react-router-dom'
import baseURL from '../../path'


import '../Task/Task.css';

export default class myTask extends Component {
    constructor(props) {
    	super(props)
	    	this.state = {
				loggedIn: false,
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
				helper_name: '',
				helper_points: '',
		      	accepted: false
		    }
		this.getUser = this.getUser.bind(this);
		this.acceptTask = this.acceptTask.bind(this);
		this.getHelperName = this.getHelperName.bind(this);
		this.addPoints = this.addPoints.bind(this);
		this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this)
	}

 
	componentDidMount() {
		this.checkIfUserIsLoggedIn()
		const taskId = this.props.match.params.taskid;
		const currentUser = sessionStorage.getItem('currentUser');
		this.setState({
			id: taskId
		})

	  	axios.get(baseURL + '/api/v1/posts.json')
		  	.then(response => {
			    let taskData = response.data
	            console.log(taskData)
	            
	            taskData.forEach(post => {
	            	console.log("post task id: " + post.task_id);
	            	console.log("current task id: " + taskId);
	                if(post.id == taskId){
	                    console.log("post found, topic id" + post.topic_id )

	                    this.setState({
	                    	id: post.id,
	                    	topic_id: post.topic_id,
					      	title: post.title,
					      	creator_id: post.creater_id,
					      	description: post.description,
					      	location: post.location,
					      	date: post.date,
					      	time: post.time,
					      	status: post.state
						}); 
						this.getUser(post.creater_id);
						this.getHelperName(currentUser);

	                    if(this.state.status == "accepted"){
	                    	this.setState({
	                    		accepted: true
	                    	})
	                    	console.log("state already accepted");
	                    }
	                }
	                else{
	                    console.log("no match")
	                }
			  	})
			});
	}

	checkIfUserIsLoggedIn(){
        axios.get(baseURL + '/users.json')
        .then(response => {
            let user = response.data
            user.forEach(u => {
                console.log(u.token)
                console.log(sessionStorage.getItem('currentUser'))
                if(u.token == sessionStorage.getItem('currentUser')){
                    console.log("yess match")
                    this.setState({
                        loggedIn: true
                    })
                    console.log("did mount current user" + this.state.loggedIn)
                }
                console.log("did mount current user" + this.state.loggedIn)
                if(this.state.loggedIn == false){
                    console.log("gooo away")
                    this.props.history.push('../login');
                }
            })
        })
        .catch(error => console.log(error))
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

	getHelperName(currentUser){
		axios.get(baseURL + `/users/${currentUser}.json`)
		  	.then(response => {
			    let userData = response.data
	            this.setState({
					helper_name: userData.name,
					helper_points: userData.karmapoints
				}); 
			});

		//Add Karmapoints to helper
		var points = {
			//data name like in db
			karmapoints: this.addPoints(this.state.helper_points)
		}

		axios.put(baseURL + `/users/${currentUser}.json`, points)
		.then(response => {
			console.log(points)
			console.log(response.data)
            console.log(response.status);
			console.log(response.statusText);
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

	acceptTask(){
		const taskId = this.state.id;
		const currentUser = sessionStorage.getItem('currentUser');
		console.log("accepting Task..." + this.state.status)
		var data = {
			state: 'accepted',
			helper_id: currentUser
		}
		axios.put(baseURL + `/posts/${taskId}`, data)
        .then(response => {
            console.log(response.data)
            console.log(response.status);
			console.log(response.statusText);
			this.setState({
				accepted: true
			});
        })
        .catch(error => console.log(error))

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
    	return (
	      	<div className="Task">
	      			<div className='headline'>
		                <div className="button_headline">
		                    <Link className="backButton" to={BackPath}> 
		                        <img className="arrow_back" src={Images.backButton} alt="back" onClick={this.props.onClick}/>
		                    </Link>
		                    <h1 className="headlineTask">Task</h1>
		                </div>
		                <hr></hr>
		            </div>
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
	                    <Link className="listTitle" className="linkProfile" to={path} > 
							<div className="infoWrapper" className="creatorList">
								<img className="userIcon" src={Images.userIcon}/>
								<p>{this.state.creator_name}</p>
								<img className="toButton" src={Images.toButton}/>
		                    </div>
	                     </Link>
                        <div className="infoWrapper">
	                        {!this.state.accepted &&
		                        <div className="acceptButtonWrapper">
		                        	<button className="acceptButton" onClick={this.acceptTask}>
					                    <a href={mail}><p>Accept Task</p></a>
					                </button>
				                </div>
			            	}
			            </div>
		            	{this.state.accepted &&
	                        <div className="acceptedFeedback">
		                       	<p>Task Accepted</p>
			                </div>
						}
	                </div>
	      	</div>
    	)
  	}
}
