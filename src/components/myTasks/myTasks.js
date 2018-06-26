import React, { Component } from 'react'
import axios from 'axios'
import Images from '../../images';
import baseURL from '../../path'
import './myTasks.css'

import { Link } from 'react-router-dom'



export default class Topics extends Component {
	constructor(props) {
    	super(props)
	    	this.state = {
				loggedIn: false,
	    		currentUser: '',
		      	createdTasks: [],
		      	helpingTasks: [],
		      	tab1: true
		    }
		this.toTab1 = this.toTab1.bind(this)
		this.toTab2 = this.toTab2.bind(this)
	}


	componentDidMount = (topics) => {
		const currentUser = sessionStorage.getItem('currentUser')
		axios.get(baseURL + '/users.json')
        .then(response => {
            let user = response.data
            user.forEach(u => {
                console.log(u.token)
                console.log(sessionStorage.getItem('currentUser'))

                if(u.token == sessionStorage.getItem('currentUser')){
                    console.log("yess match")
                    this.setState({
                        currentUser: u.id
                    })
                    console.log("did mount current user" + this.state.currentUser)
                }
            })
        })
        .catch(error => console.log(error))

		let createdTasks = []
		let helpingTasks = []


		  	axios.get(baseURL + '/api/v1/posts.json')
		  	.then(response => {
			    let taskData = response.data
	            
	            taskData.forEach(post => {
					if(post.creater_id == this.state.currentUser){ 
	                    console.log("created post found")
	                    createdTasks.push({
					        id: post.id,
					        title: post.title,
					        date: post.date,
					        state: post.state
						}); 
	                }
	                if(post.helper_id == this.state.currentUser){
	                    console.log("helping post found")
	                    helpingTasks.push({
					        id: post.id,
					        title: post.title,
					        state: post.state
						}); 
	                }
	                else{
	                    console.log("no matched creator found")
	                }
			  	})
		  		this.setState({
					createdTasks: createdTasks,
					helpingTasks: helpingTasks
				})
			})
	}

	toTab1(){
		this.setState({
			tab1: true
		})
	}

	toTab2(){
		this.setState({
			tab1: false
		})
	}




  	render() {
    	return (
	      	<div className="body">
	       		<div className='headline'>
	                <div className="button_headline">
	                    <Link className="backButton" to={"../home"}> 
	                        <img className="arrow_back" src={Images.backButton} alt="back" onClick={this.props.onClick}/>
	                    </Link>
	                    <h1 className="headlineMyTask">My Tasks</h1>
	                </div>
		        </div>

		        {this.state.tab1 &&
	       		<div className="tabs">
	       			<div className="tab" className="currentTab" onClick={this.toTab1}>Created Tasks</div>
					<div className="tab" onClick={this.toTab2}>Accepted Tasks</div>
	       		</div>
	       		}
	       		{!this.state.tab1 &&
	       		<div className="tabs">
	       			<div className="tab" onClick={this.toTab1}>Created Tasks</div>
					<div className="tab" className="currentTab" onClick={this.toTab2}>Accepted Tasks</div>
	       		</div>
	       		}
				
				{this.state.tab1 &&
		       		<div className="taskList">
	                    {this.state.createdTasks.map((prop) => {

	                    	const path1 = '/myTasks/' + prop.id;
	                        
	                        return (
	                           	<Link className="LinkToTask2" key={prop.id} to={path1} > 
									<div className="taskTitle">
										{prop.title}
									</div>
									<div className={prop.state}>
										<p>{prop.state}</p>
									</div>
	                            </Link>
	                        )
	                    })}
	                </div>
            	}

            	{!this.state.tab1 &&
					<div className="taskList">
	                    {this.state.helpingTasks.map((prop) => {

	                    	const path2 = '/myTasks/' + prop.id;

							return (
	                           	<Link className="LinkToTask2" key={prop.id} to={path2} > 
									<div className="taskTitle">
										{prop.title}
									</div>
									<div className={prop.state}>
										<p className="stateTextTab2">{prop.state}</p>
										<img className="karmaPoint" src={Images.doneKarma} alt="a coin with a heart, symbolizing Karma Points" />
									</div>
	                            </Link>
	                        )
	                    })}
	                </div>
				}
	      	</div>
    	)
  	}
}