import React, { Component } from 'react'
import Headline from '../../pices/Headline/Headline.js'
import './Logout.css'


export default class Logout extends Component {
  	render() {
    	return (
	      	<div>
				<Headline 
					 text="Logout"
					 path="./"
				/>
	      	</div>
    	)
  	}
}

