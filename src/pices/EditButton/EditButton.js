import React from 'react';
import { Component } from 'react';
import EditIcon from '../../images/Edit.png';
import './EditButton.css';

export default class LargeButton extends Component {
    render() {
        return (
            <div className='editLink'>
                <div id={this.props.id} onClick={this.props.onClick} value={this.props.value}>
                    <img className="editIcon" alt='pen as a symbol for edit' src={EditIcon} />
                </div>
            </div>
        );
    }
}
