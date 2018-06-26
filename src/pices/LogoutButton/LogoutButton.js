import React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import './LogoutButton.css';

export default class LogoutButton extends Component {
    render() {
        const classList = classNames(
            'logout-button'
        );

        return (
            <div className={classList}>
                <button className={classList} id={this.props.id} onClick={this.props.onClick} value={this.props.value}>
                    <p>{this.props.text}</p>
                </button>
            </div>
        );
    }
}
