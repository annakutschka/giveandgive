import React from 'react';
import { Component } from 'react';
import './Post.css';

export default class Post extends Component {
    render() {
        return (
            <div className="post">
                <div className="text-distance">
                    <div className="post-text">
                        <p>{this.props.text}</p>
                    </div>
                    <div className="post-distance">
                        <p>{this.props.distance}</p>
                    </div>
                </div>
            </div>
        );
    }
}
