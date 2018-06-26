import React from 'react';
import { Component } from 'react';
import './Textarea.css';

export default class Input extends Component {
    render() {
        return (
            <div className='textarea'>
                <textarea id={this.props.id} placeholder={this.props.placeholder} />
            </div>
        );
    }
}