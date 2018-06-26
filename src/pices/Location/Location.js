import React from 'react';
import { Component } from 'react';
import './Location.css';

export default class Headline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latitude: '',
            longitude: '',
            error: ''
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {
        return (
        <p className="location">{this.state.latitude} {this.state.longitude} 
        {this.state.error ? <p>Error: {this.state.error}</p> : null} </p>
        );
    }
}