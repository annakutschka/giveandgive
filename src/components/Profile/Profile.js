import React, { Component } from 'react'
import axios from 'axios'
import ProfilePicture from '../../images/Profile.png'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import EditButton from '../../pices/EditButton/EditButton.js'
import LogoutButton from '../../pices/LogoutButton/LogoutButton.js'
import KarmaButton from '../../pices/KarmaButton/KarmaButton.js'
import Star from '../../pices/Stars/Stars.js'
import ProfileName from '../../pices/ProfileName/ProfileName.js'
//import Location from '../../pices/Location/Location.js'
import baseURL from '../../path'
import './Profile.css'

import { Link } from 'react-router-dom'



export default class Profile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			description: '',
			email: '',
			points: ''
		  }
	}

	componentDidMount() {
        axios.get(baseURL + '/users')
        .then(response => {
            console.log(response.data.password)
            let user = response.data
            user.forEach(u => {
                if(u.token === sessionStorage.getItem('currentUser')){
                    let currentUser = u.id
                   
                    axios.get(baseURL + `/users/${currentUser}`)
                    .then(response => {
                        //get all data from User with the id 
                        let UserData = response.data
                        // console.log(UserData)
                        this.setState({username: UserData.name}) 
                        this.setState({description: UserData.description}) 
						this.setState({email: UserData.email}) 
						this.setState({points: UserData.karmapoints}) 
                    })
                }
                // else{
                // 	 this.props.history.push('../login');
                // }
            })
        })
		.catch(error => console.log(error))
    }
    
    onClick(){
        //Logout
        sessionStorage.removeItem('currentUser')
	}
	
  	render() {
		const mail = 'mailto:' + this.state.email
    	return (
	      	<div class="profile">
				<div class="picture">
					<img src={ProfilePicture} alt="Profilbild" />
					<div className="profile_edit">
						<ProfileName
							text = {this.state.username}
						/>
						
						<Link to={`./profile/edit`}> 
							<EditButton/>
						</Link>
					</div>
				</div>
					
				<Link className="karmaButton" to={`./profile/karma`}> 
					<KarmaButton
						text="KARMAPOINTS"
					/>
				</Link>


				<div className="description">
					<p><a href={mail}>{this.state.email}</a></p>
					
					<p>{this.state.description}</p>
				</div>

				{/* <div className="stars">
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
				</div> */}
				{/* <svg className="bar">
					<rect width={10 * 10} height="19" y="60"></rect>
				</svg> */}

				<Link className="backButton" to={"./../home"}> 
					<LargeButton
						text="BACK"
					/>
				</Link> 

                
                <Link className="Link to topics" to={"./"} >
                    <LogoutButton
                        text="LOGOUT"
                        onClick={this.onClick}
                        value="Submit"
                    />
                </Link>

				
	      	</div>
    	)
  	}
}