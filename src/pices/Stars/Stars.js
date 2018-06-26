import React from 'react';
import { Component } from 'react';
import './Stars.css';

export default class Headline extends Component {
    render() {
        return (
                <svg height="50" width="50">
                    <polygon className={this.props.theme} points="25,2.5 10,45.5 47.5,19.5 2.5,19.5 40,47.5"/>
                </svg>
        );
    }
}
