import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Location = props => (
    <tr>
        <td>{props.location.locationName}</td>
        <td>{props.location.latitude}</td>
        <td>{props.location.longitude}</td>
        <td>{props.location.radius}</td>
        <td>
            <Link to={"/edit/"+props.location._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete/"+props.location._id}>Delete</Link>
        </td>
    </tr>
)

export default class LocationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {locations: []};
    }

    componentDidMount() {
        axios.get('https://questhunt-backend.herokuapp.com/locations/')
            .then(response => {
                this.setState({ locations: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    locationList() {
        return this.state.locations.map(function(currentLocation, i){
            return <Location location={currentLocation} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Locations List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Location Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Radius</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.locationList() }
                    </tbody>
                </table>
            </div>
        )
    }
}