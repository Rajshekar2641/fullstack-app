import React, { Component } from 'react';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import {FaEdit, FaTrash, FaPlus, FaHome} from "react-icons/fa";

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
                <Button href="/" variant="primary" size="lg"><FaHome />&nbsp; Home</Button>{' '}
                <br></br><br></br>
                <h3>Add a New Location</h3>
                <div className="row">
                    <div className="col-md-3 center">
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Location Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.locationName}
                                onChange={this.onChangeLocationName}
                                pattern="[a-zA-Z_ ]+"
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Latitude: </label>
                        <input 
                                type="number" step=".0000000001"
                                className="form-control"
                                value={this.state.latitude}
                                onChange={this.onChangeLocationLatitude}
                                min="-90" max="90"
                                />
                    </div>
                    <div className="form-group">
                        <label>Longitude: </label>
                        <input 
                                type="number" step=".00000000001"
                                className="form-control"
                                value={this.state.longitude}
                                onChange={this.onChangeLocationLongitude}
                                min="-180" max="180"
                                />
                    </div>
                    <div className="form-group">
                        <label>Radius(in meters): </label>
                        <input 
                                type="number" 
                                className="form-control"
                                value={this.state.radius}
                                onChange={this.onChangeLocationRadius}
                                min="1" max="50"
                                />
                    </div>

                    <div className="form-group">
                     <input type="submit" value = "Add Location"  className="btn btn-primary"/>
                    </div>
                </form>
                </div>
                </div>
            </div>
        )
    }
}
