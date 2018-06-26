import React from 'react';
import { Component } from 'react';
import './ProfileName.css';

export default class Headline extends Component {
    render() {
        return (
            <h2 className="name">{this.props.text}</h2>
        );
    }
}
