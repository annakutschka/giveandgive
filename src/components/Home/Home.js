import React, { Component } from 'react'
import axios from 'axios'
import Images from '../../images';
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import Headline from '../../pices/Headline/Headline.js'
import Post from '../../pices/Post/Post.js'
import baseURL from '../../path'

import './Home.css'

import { Link, history } from 'react-router-dom'



export default class Home extends Component {
	constructor(props) {
    	super(props)
	    	this.state = {
		      	loggedIn: false 
		    }
    }

  	render() {
    	return (
           
                <div className="homeWrapper">
                	<img src={Images.logo}/>
                    <Link className="Link to topics" to={"./createtask"} >
                    <LargeButton
                            text="I need..."
                        />
                    </Link> 
                    <Link className="Link to topics" to={"./categories"} >
                        <LargeButton
                            text="I give..."
                        />
                    </Link>

                    <div className="wrapper2">
                        <Link className="LinkToTopics" to={"./profile"} >
                            <div className="button6">
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link className="LinkToTopics" to={"./myTasks"} >
                            <div className="button6">
                                <p>My Tasks</p>
                            </div>
                        </Link>
                    </div>
                     
                </div>
            
    	)
  	}
}

