import React, { Component } from 'react'
import axios from 'axios'
//import ProfilePicture from '../../images/Profile.png'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import Title from '../../pices/Title/Title.js'
import './ProfileEdit.css'
import baseURL from '../../path'

export default class Profile extends Component {
	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.getUserData = this.getUserData.bind(this);

		this.state = {
			currentUser: '',
			username: '',
			description: 'Description',
			email: '',
			loggedIn:false
		  }
		  
	}

	handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        });
    }

	componentDidMount() {
		axios.get(baseURL + '/users.json')
        .then(response => {
            let user = response.data
            user.forEach(u => {
                console.log(u.token)
                console.log(sessionStorage.getItem('currentUser'))

                if(u.token == sessionStorage.getItem('currentUser')){
                    this.setState({
                        currentUser: u.id
					})
					this.getUserData()
                    console.log("did mount current user " + this.state.currentUser)
                }
            })
        })
				.catch(error => console.log(error))
		//getting data from API of current User
	}

	getUserData(){
		console.log("in function biatch")
		axios.get(baseURL + `/users/${this.state.currentUser}`)
		.then(response => {
			console.log("name" + response.data.name);
			console.log(response.status);
			console.log(response.statusText);
			console.log('response: ' + response)
			//get all data from User with the id 
			let UserData = response.data
			
			this.setState({
				username: UserData.name,
				description: UserData.description,
				email: UserData.email	
			}) 

			console.log("name" + this.state.username)
		})
		.catch(error => console.log(error))
	}

	//delete profile
	handleDelete(){
		axios.get(baseURL + '/users')
        .then(response => {
			let user = response.data
			user.forEach(u => {
				if(u.token === sessionStorage.getItem('currentUser')){
					axios.delete(baseURL + `/users/${u.id}`)
					.then(function(response) {
						console.log(user);
						//ausloggen -> aus session werfen
						sessionStorage.removeItem('currentUser');
						console.log('deleted: ' + u.id);
					})
					.catch(function(error) {
						console.log(error);
					});
				}
			})
		})
	}
	
	onClick(){
		var data = {
			name: this.state.username,
			email: this.state.email,
			description: this.state.description
		}
		//getting data from API of current User
		axios.put(baseURL + `/users/${this.state.currentUser}`, data)
		.then(response => {
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log('response: ' + response)
			//change all data from User with the id 
			let UserData = response.data
			
			UserData.name = this.state.username
			UserData.email = this.state.email
			UserData.description = this.state.description
		})
		.then(
			this.props.history.push('../profile')
		)
		.catch(error => console.log(error))

	}

  	render() {
    	return (
	      	<div class="profile">
				<form id="createEventForm" onSubmit={this.handleSubmit}>
					<Title
						text = 'Name'
					/>
					<div className="formelement">
                        <input name="username" value={this.state.username} onChange={this.handleChange} type="text" id="name" placeholder={this.state.username} className="inputfield" required/>
                    </div>

					<Title
						text = 'Email'
					/>
					<div className="formelement">
                        <input name="email" value={this.state.email} onChange={this.handleChange} type="email" id="email" placeholder={this.state.email} maxLength="50" className="inputfield" required/>
                    </div>

					<Title
						text = 'Description'
					/>		
					 <div className="formelement">
                        <textarea class="textarea" name="description" placeholder={this.state.description} value={this.state.description} className="description" onChange={this.handleChange} id="description" ></textarea>
                    </div>
				</form>

				<LargeButton
					text="SAVE"
					onClick = {this.onClick}
					value="Save"
				/>

				<div className="delete">
					<LargeButton
						text="DELETE PROFILE"
						onClick = {this.handleDelete}
						value="delete"
					/>
				</div>
	      	</div>
    	)
  	}
}