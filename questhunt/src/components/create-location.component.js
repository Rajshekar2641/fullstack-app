import React, { Component } from 'react';
import axios from 'axios';

export default class CreateLocation extends Component {

    constructor(props) {
        super(props);

        this.onChangeLocationName = this.onChangeLocationName.bind(this);
        this.onChangeLocationLatitude = this.onChangeLocationLatitude.bind(this);
        this.onChangeLocationLongitude = this.onChangeLocationLongitude.bind(this);
        this.onChangeLocationRadius = this.onChangeLocationRadius.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            locationName: '',
            latitude: '',
            longitude: '',
            radius: ''
        }
    }

    onChangeLocationName(e) {
        this.setState({
            locationName: e.target.value
        });
    }

    onChangeLocationLatitude(e) {
        this.setState({
            latitude: e.target.value
        });
    }

    onChangeLocationLongitude(e) {
        this.setState({
            longitude: e.target.value
        });
    }

    onChangeLocationRadius(e) {
        this.setState({
            radius: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Location Name: ${this.state.locationName}`);
        console.log(`Latitude: ${this.state.latitude}`);
        console.log(`Longitude: ${this.state.longitude}`);
        console.log(`Radius: ${this.state.radius}`);

        const newLocation = {
            locationName: this.state.locationName,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            radius: this.state.radius
        };

        axios.post('https://questhunt-backend.herokuapp.com/locations/add', newLocation)
            .then(res => console.log(res.data));

        this.setState({
            locationName: '',
            latitude: '',
            longitude: '',
            radius: ''
        })
        this.props.history.push('/locations');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Location</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Location Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.locationName}
                                onChange={this.onChangeLocationName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Latitude: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.latitude}
                                onChange={this.onChangeLocationLatitude}
                                />
                    </div>
                    <div className="form-group">
                        <label>Longitude: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.longitude}
                                onChange={this.onChangeLocationLongitude}
                                />
                    </div>
                    <div className="form-group">
                        <label>Radius: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.radius}
                                onChange={this.onChangeLocationRadius}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Location" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
