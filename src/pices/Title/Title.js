import React from 'react';
import { Component } from 'react';
import './Title.css';

export default class Headline extends Component {
    render() {
        return (
            <h2 className="title">{this.props.text}</h2>
        );
    }
}
