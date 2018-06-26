import React, { Component } from 'react'
import LargeButton from '../../pices/LargeButton/LargeButton.js'
import Logo from '../../images/newLogo.png'


import './Startpage.css'

import { Link } from 'react-router-dom'


export default class Home extends Component {
  	render() {
    	return (
            <div className="startpage">
                <h1>Give 'n' Give</h1>
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <Link className="Link to topics" to={"./login"} >
                    <LargeButton 
                        text="SIGN IN"
                    />
                </Link> 
                <Link className="Link to topics" to={"./register"} >
                    <LargeButton
                        text="REGISTER"
                    />
                </Link>
            </div>
    	)
  	}
}

