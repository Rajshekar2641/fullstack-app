import React, { Component } from 'react';
import axios from 'axios';
import { Button} from 'react-bootstrap';

export default class DeleteLocation extends Component {

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
        axios.delete('https://questhunt-backend.herokuapp.com/locations/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/locations');
    }

    render() {
        return (
        <div style={{marginTop: 10}}>
                <h3>Delete Location</h3>
                <div className="row">
                    <div className="col-md-3 center">
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Location Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.locationName}
                                onChange={this.onChangeLocationName} readOnly
                                />
                    </div>
                    <div className="form-group">
                        <label>Latitude: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.latitude}
                                onChange={this.onChangeLocationLatitude} readOnly
                                />
                    </div>
                    <div className="form-group">
                        <label>Longitude: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.longitude}
                                onChange={this.onChangeLocationLongitude} readOnly
                                />
                    </div>
                    <div className="form-group">
                        <label>Radius: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.radius}
                                onChange={this.onChangeLocationRadius} readOnly
                                />
                    </div>

                    <br />
                    
                    <div className="form-group">
                        <input type="submit" value="Delete Location" className="btn btn-danger"/>
                    </div>
                </form>
                </div>
                </div>
            </div>
        )
    }
}