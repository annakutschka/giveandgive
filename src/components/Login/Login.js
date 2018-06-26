import React, { Component } from 'react'
import axios from 'axios'
import Headline from '../../pices/Headline/Headline.js'
import Title from '../../pices/Title/Title.js'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import baseURL from '../../path'
import './Login.css'

let randomstring = require("randomstring");


export default class Login extends Component {
    
	constructor(props) {
            super(props)
            
            this.handleChange = this.handleChange.bind(this);
            this.onClick = this.onClick.bind(this)	 
            
            this.state = {
                email: '',
                password: '',
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
        const currentuserid = 0;
        //check correct login data
        axios({
            method: 'post',
            url: baseURL + '/user_token',
            data: {"auth": {email: this.state.email, password: this.state.password}},
            headers: {'Content-Type': 'application/json' }
        })
        .then(response => {
            if(response.data.jwt != null){
                this.props.history.push('./home')

                //get current user
                axios.get(baseURL + '/api/v1/users')
                .then(response => {
                    response.data.forEach(u => {
                        if(u.email === this.state.email){
                            console.log(u.id)

                            const Usertoken = randomstring.generate(100)
                            sessionStorage.setItem('currentUser', Usertoken)
                            //set global state true

                            var data = {
                                token: Usertoken
                            }
                            console.log("after data token" + data.name)

                            axios.put(baseURL + `/users/${u.id}.json`, data)
		                    .then(response => {
                                console.log(response.data)
                                console.log(response.status);
                                console.log(response.statusText);
                            })
                            .catch(error => console.log(error))
                        }
                        else{
                            console.log("fehler")
                        }
                    })
                    console.log("logged in")
                })
                .catch(error => console.log(error))
            }
            else{
                console.log("anything went wrong")
            }
        })
        .catch(error => {
            this.setState({
                falseEntry: true,
                message: "Email or password is invalid."
            })
        })
        
	}


  	render() {
    	return (
	      	<div>
                <Headline
                text="Login"
                path="./"
                />

                <form id="createEventForm" onSubmit={this.handleSubmit}>

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

