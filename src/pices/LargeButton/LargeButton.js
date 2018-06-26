import React from 'react';
import { Component } from 'react';
import './LargeButton.css';

export default class LargeButton extends Component {
    render() {
        return (
            <div className='button-big'>
                <button className='button-big' id={this.props.id} onClick={this.props.onClick} value={this.props.value} type={this.props.type}>
                    <p>{this.props.text}</p>
                </button>
            </div>
        );
    }
}
