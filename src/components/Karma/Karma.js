import React, { Component } from 'react'
import axios from 'axios'
import Headline from '../../pices/Headline/Headline.js'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import Karmalogo from '../../images/Karmalogo.png'
import baseURL from '../../path'

import './Karma.css'

import { Link } from 'react-router-dom'



export default class Karma extends Component {
	constructor(props) {
		super(props)	
		
		this.state = {
			loggedIn: false,
			points: '',
			money: ''
		}
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

										axios.get( baseURL + `/users/${this.state.currentUser}`)
										.then(response => {
											console.log(response.data.karmapoints)
											this.setState({
												points: response.data.karmapoints,
												money: (response.data.karmapoints/10)
											}) 
										})
										.catch(error => console.log(error))
                    console.log("did mount current user " + this.state.currentUser)
                }
            })
        })
				.catch(error => console.log(error))
		//getting data from API of current User
	}


  	render() {
    	return (
	      	<div>
	       		<Headline 
					 text="Karma Points"
					 path="./"
				/>
	       		 
				<div className="karmapage">
					<p class="karma"> You have earned </p>
					<p class="points">{this.state.points} </p>
					<p class="karma"> Karma Points </p>
					<img src={Karmalogo} alt="Karmalogo"/>
					<p class="karma"> which are </p>
					<p class="points">{this.state.money}€ </p>
				</div>

				<Link className="backButton" to={`../profile`}> 
					<LargeButton
						text="Back"
					/> 
				</Link>
	      	</div>
    	)
  	}
}