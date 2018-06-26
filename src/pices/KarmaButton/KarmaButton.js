import React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import './KarmaButton.css';

export default class LargeButton extends Component {
    render() {
        const classList = classNames(
            'button-big'
        );

        return (
            <div className={classList}>
                <button className="karmabutton" id={this.props.id} onClick={this.props.onClick}>
                    <p>{this.props.text}</p>
                </button>
            </div>
        );
    }
}
