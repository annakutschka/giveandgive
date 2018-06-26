import React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import './Input.css';

export default class Input extends Component {
    render() {
        const classList = classNames(
            'input'
        );

        return (
            <div className={classList}>
                <input type={this.props.type} id={this.props.id} placeholder={this.props.placeholder} onChange={this.props.onChange}/>
            </div>
        );
    }
}