import React from 'react';
import { Component } from 'react';
import Post from '../../pices/Post/Post.js';
import Images from '../../images';
import baseURL from '../../path'

import axios from 'axios';

import { Link } from 'react-router-dom'


import './Topic.css';

export default class Topic extends Component {
    constructor(props) {
    	super(props)
	    	this.state = {
	    		id: '',
		      	tasks: [],
		      	topic_name: ''
		    }
		this.getTopicName = this.getTopicName.bind(this);
	}
 
	componentDidMount() {
		const topicId = this.props.match.params.topicid;
		this.getTopicName(topicId);

		this.setState({
			id: topicId
		})
		let relevantTasks = [];

	  	axios.get(baseURL + '/api/v1/posts.json')
		  	.then(response => {
			    let taskData = response.data
	            console.log(taskData)
	            
	            taskData.forEach(post => {
	                if(post.topic_id == topicId && post.state == 'pending'){ //auf == pendin ändern
	                    console.log("post found")
	                    relevantTasks.push({
					        id: post.id,
					        title: post.title,
					        location: post.location
						}); 
	                }
	                else{
	                    console.log("no match")
	                }
			  	})
		  		this.setState({
					tasks: relevantTasks,
				});
			});
	}

	getTopicName(topicId){
		axios.get(baseURL + `/topics/${topicId}.json`)
		  	.then(response => {
			    let topicData = response.data
	            console.log("user found" + topicData.name);
	            this.setState({
	                topic_name: topicData.name
				}); 
			});
	}
    render() {
    	return (
	      	<div>
       			<div className='headline'>
	                <div className="button_headline">
	                    <Link className="backButton" to={'../../categories'}> 
	                        <img className="arrow_back" src={Images.backButton} alt="back" onClick={this.props.onClick}/>
	                    </Link>
	                    <h1>{this.state.topic_name}</h1>
	                </div>
	                <hr></hr>
	            </div>
       		 	<div className="taskList">
                    {this.state.tasks.map((prop) => {

                    	const topicId = this.state.id;
                    	const path = '/categories/'+topicId+'/'+prop.id;
                        
                        return (
                           	<Link className="LinkToTask" key={prop.id} to={path} > 
								<Post
									text = {prop.title}
									distance = {prop.location} 
								/>
                            </Link>
                        )
                    })}
                </div>
	      	</div>
    	)
  	}
}
