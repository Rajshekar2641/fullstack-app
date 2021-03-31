import React, { Component } from 'react';
import axios from 'axios';

export default class EditLocation extends Component {

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

    componentDidMount() {
        axios.get('https://questhunt-backend.herokuapp.com/locations/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    locationName: response.data.locationName,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    radius: response.data.radius
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {
            locationName: this.state.locationName,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            radius: this.state.radius
        };
        console.log(obj);
        axios.post('https://questhunt-backend.herokuapp.com/locations/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/locations');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
            <h3>Update Location</h3>
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
                                type="number"  step=".00000000001"
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
                        <label>Radius: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.radius}
                                onChange={this.onChangeLocationRadius}
                                min="1" max="50"
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Location" className="btn btn-success" />
                    </div>
                </form>
                </div></div>
            </div>
        )
    }
}
