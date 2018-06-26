import React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import Images from '../../images';
import './MailButton.css';

export default class LargeButton extends Component {
    render() {
        return (
            <div class='button-edit'>
                <button id={this.props.id} onClick={this.props.onClick} value={this.props.value}>
                    <a href={this.props.mailto}><img src={Images.mailIcon} /></a>
                </button>
            </div>
        );
    }
}
