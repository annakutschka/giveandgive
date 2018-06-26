import React, { Component } from 'react'
import axios from 'axios'
import ProfilePicture from '../../images/Profile.png'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import Star from '../../pices/Stars/Stars.js'
import ProfileName from '../../pices/ProfileName/ProfileName.js'
import MailButton from '../../pices/MailButton/MailButton.js'
import Images from '../../images';
import baseURL from '../../path'


import './OtherProfile.css'

import { Link } from 'react-router-dom'



export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
            loggedIn: false,
			username: '',
			description: '',
		 	email: ''
	  	}
	}

	componentDidMount() {
		const currentUser = this.props.match.params.userid
		console.log("User: " + currentUser);
		//getting data from API of current User
		axios.get(baseURL + `/users/${currentUser}`)
		.then(response => {
			//get all data from User with the id 
			let UserData = response.data
			// console.log(UserData)
			// console.log("Username:" + UserData[currentUser-1].name)
			this.setState({username: UserData.name}) 
			this.setState({description: UserData.description}) 
			this.setState({email: UserData.email}) 
		})
		.catch(error => console.log(error))
    }
    
    onClick(){
        //Logout
        sessionStorage.removeItem('currentUser')
    }
	
  	render() {
		//const path = window.history.back();
		const mail = 'mailto:' + this.state.email 
    	return (
	      	<div class="profile">
				<div class="picture">
					<img src={ProfilePicture} alt="Profilbild" />
					<div className="profile_edit">
						<ProfileName
							text = {this.state.username}
						/>
					</div>
				</div>

				<MailButton
					mailto= {mail}
				/>
				
				<div className="description">
					<p>{this.state.description}</p>
				</div>

				<div className="profilebottom">
					<div className="stars">
						<Star
							theme="yellow"
						/>
						<Star
							theme="yellow"
						/>
						<Star
							theme="yellow"
						/>
						<Star
							theme="white"
						/>
						<Star
							theme="white"
						/>
					</div>

					<Link className="backButton" to={"./."}> 
					<LargeButton
						text="BACK"
					/>
				</Link>  
				</div>
	      	</div>
    	)
  	}
}