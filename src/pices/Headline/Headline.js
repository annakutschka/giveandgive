import React from 'react';
import { Component } from 'react';
// import classNames from 'classnames';
import BackButton from '../../images/arrowBack.png'
import './Headline.css';
import { Link } from 'react-router-dom'



export default class Headline extends Component {
    render() {

        return (
            <div className='headline'>
                <div className="button_headline">
                    <Link className="backButton" to={this.props.path}> 
                        <img className="arrow_back" src={BackButton} alt="back" onClick={this.props.onClick}/>
                    </Link>
                    <h1>{this.props.text}</h1>
                </div>
                <hr></hr>
            </div>
        )
    }
}
