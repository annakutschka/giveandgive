import React, { Component } from 'react'
import axios from 'axios'
import Headline from '../../pices/Headline/Headline.js'
import Images from '../../images';
import baseURL from '../../path'

import './Topics.css'

import { Link } from 'react-router-dom'



export default class Topics extends Component {
	constructor(props) {
        super(props)
	    	this.state = {
                  topicnames: [],
                  loggedIn: false 
		    }
	}

    componentDidMount = (topics) =>{
        axios.get(baseURL + '/api/v1/topics.json')
        .then(response => {
            console.log(response.data)
            console.log("icon: " + response.data[0].tag)
            this.setState({topicnames: response.data}) 
        })
        .catch(error => console.log(error))
    }

  	render() {

    	return (
	      	<div>
	       		<Headline 
					 text="Topics"
					 path="../home"
				/>
	       		 	<div className="topicList">
	                    {this.state.topicnames.map((prop) => {
                            const path = '/categories/' + prop.id;
                            return (
                               	<Link className="LinkToTopics" key={prop.id} to={path} > 
										<div className="topic">
											<img className="topicIcon" alt={prop.name} src={Images[prop.tag]} />
											<h4 className="topicName">{prop.name} </h4>
										</div>
                                </Link>
                            )
	                    })}
	                </div>
	            <Link className="backButton" to={`./../home`}> 
				
				</Link>
	      	</div>
    	)
  	}
}