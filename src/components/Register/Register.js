import React, { Component } from 'react'
import axios from 'axios'
import Headline from '../../pices/Headline/Headline.js'
import Title from '../../pices/Title/Title.js'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import validate from 'validator'
import './Register.css'
import baseURL from '../../path'

export default class Register extends Component {
	constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this)	 
        
        this.state = {
            name: '',
            email: '',
            password: '',
            repeat_password: '',
            message: '',
            falseEntry: false
        }
    }
    
    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        });
    }

	onClick(){
        if (this.state.email === "" || this.state.name === "" || this.state.password === ""){
            this.setState({
                falseEntry: true,
                message: "Please fill out all fields"
            })
        }
        else if(!validate.isEmail(this.state.email)){
            this.setState({
                falseEntry: true,
                message: "This is no email adress"
            })
            console.log(this.state.currentUser)
        }
        else if(!validate.isLength(this.state.name, {min:2, max: 30})){
            this.setState({
                falseEntry: true,
                message: "This name is too short or too long"
            })
        }
        else if(this.state.password !== this.state.repeat_password){
            this.setState({
                falseEntry: true,
                message: "passwords are not the same"
            })
        }
        else if(this.state.password.length < 6){
            this.setState({
                falseEntry: true,
                message: "passwords minimum length has to be 6"
            })
        }
        else {
            this.setState({
                falseEntry: false
            })
            axios.post(baseURL + '/api/v1/users', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                description: this.state.description,
                karmapoints: 0,
                rating: 0
            })
            .then(response => {
                console.log(response.data)
                this.props.history.push('./login')
            })
            .catch(error => {
                this.setState({
                    falseEntry: true,
                    message: "Email already exists"
                })
            })
        }
	}


  	render() {
    	return (
	      	<div>
	       		<Headline 
                   text="Register"
                   path="./"
				/>
				<form id="createEventForm" onSubmit={this.handleSubmit}>

                    <Title
                        text="Name"
                    />

                    <div className="formelement">
                        <input name="name" value={this.state.name} onChange={this.handleChange} type="name" id="name" placeholder="name" maxLength="50" className="inputfield" required/>
                    </div>

                    <Title
                        text="Email"
                    />

                    <div className="formelement">
                        <input name="email" value={this.state.email} onChange={this.handleChange} type="email" id="email" placeholder="email" maxLength="50" className="inputfield" required/>
                    </div>

                    <Title
                        text="Password"
                    />

                    <div className="formelement">
                        <input name="password" placeholder="password" value={this.state.password} className="password" onChange={this.handleChange} type="password" id="password" />
                    </div>

                    <Title
                        text="Repeat Password"
                    />

                    <div className="formelement">
                        <input name="repeat_password" placeholder="password" value={this.state.repeat_password} className="repeat_password" onChange={this.handleChange} type="password" id="repeat_password" />
                    </div>
                </form>

                <LargeButton
                    text="SUBMIT"
                    onClick={this.onClick}
                    value="Submit"
                />

	       		{this.state.falseEntry &&
                    <p className="wrongEntry">{this.state.message}</p>
                }
	      	</div>
    	)
  	}
}

