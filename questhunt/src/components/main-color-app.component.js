import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import "../styles/index.css";
import {response} from "../Data/responseData";

import { Button} from 'react-bootstrap';

export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
    }


    componentDidMount() {
        var temp = [];
        var target;
        axios.get('https://questhunt-backend.herokuapp.com/locations/')
        .then(response => {
            this.setState({ locations: response.data });
            for(var i = 0; i< response.data.length; i++){
                temp.push(response.data[i].locationName);
            }
            console.log(temp.length);
            target = temp[Math.floor(Math.random()*temp.length)];
            console.log(target);
        })
        .catch(function (error){
            console.log(error);
        })

        let device, location;
        window.addEventListener('load', main);
        window.addEventListener('DOMContentLoaded', function () {
            let locationElement1 = document.getElementById("colorSelector1");
            let locationElement2 = document.getElementById("colorSelector2");
            locationElement1.addEventListener('click', onClickColor1);
            locationElement1.addEventListener('touch', onClickColor1);
            locationElement2.addEventListener('click', onClickColor2);
            locationElement2.addEventListener('touch', onClickColor2);
        });

            function main() {
                console.log('Page is fully loaded');
            }

            function onClickColor1() {
                { response.map((data,key)=>{

                document.getElementById("colorSelector1").innerHTML = data.colorComponent1 + target;
                let utterance = new SpeechSynthesisUtterance(data.colorComponent1 + target);
                speechSynthesis.speak(utterance);
                })}
            }

            async function onClickColor2() {
                device =  await getLocation();
            
                let isInside = isInsideQuad(device, location);
                let status;
                let speak;
                status = "Device Coordinates: " + "<br>";
                status += "Latitude: " + device.coords.latitude + "<br>";
                status += "Longitude: " + device.coords.longitude + "<br>";
                if(isInside) {
                    { response.map((data,key)=>{
                    status += data.colorComponent2Success;
                    speak = data.colorComponent2Success;
                } )}
                } else {
                    { response.map((data,key)=>{
                    status += data.colorComponent2failure;
                    speak = data.colorComponent2failure;
                } )}
                }
                document.getElementById("colorSelector2").innerHTML = status;
                let utterance = new SpeechSynthesisUtterance(speak);
                speechSynthesis.speak(utterance);
            
            }
            
            
            function getLocation() {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                }).then(position => {
                    return position;
                });
            }
            
            function isValid(coordinates) {
                let lat = coordinates.latitude;
                let lon = coordinates.longitude;
            
                if (lat < -90 || lat > 90 || lon < -180 || lon > 180)
                    return false;
                else
                    return true;
            }
            
            function isValidDevice(device) {
                let deviceCoordinates = {};
                deviceCoordinates["latitude"] = device.coords.latitude;
                deviceCoordinates["longitude"] = device.coords.longitude;
            
                if (isValid(deviceCoordinates))
                    return true;
                else
                    throw "Invalid Device";
            }
            
            function isValidType(location) {
                if (location.type === "quad")
                    return true;
                else
                    throw "Invalid Location Type";
            }
            
            function isValidCoordinates(coordinates) {
                if (coordinates.length != 4)
                    return false;
            
                coordinates.forEach(function (coordinate, index) {
                    if (!isValid(coordinate))
                        return false;
                })
            
                return true;
            }
            
            function isValidLocation(location) {
                if (location.name.length > 0 && isValidType(location) && isValidCoordinates(location.coordinates))
                    return true;
                else
                    throw "Invalid Location";
            }
            
            function isValidArguments(device, location) {
                if(device == null && location == null)
                    throw "Two valid arguments are needed";
                else
                    return true;
            }
            
            function isInsideQuad(device, location) {
                try {
                    let checkValid = isValidArguments(device, location) && isValidDevice(device) && isValidType(location) && isValidLocation(location);
                    if (checkValid) {
                        let x = device.coords.latitude;
                        let y = device.coords.longitude;
            
                        let inside = false;
                        let coordinates = location.coordinates;
                        for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
                            let xi = coordinates[i]["latitude"], yi = coordinates[i]["longitude"];
                            let xj = coordinates[j]["latitude"], yj = coordinates[j]["longitude"];
            
                            let intersect = ((yi > y) != (yj > y))
                                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                            if (intersect) inside = !inside;
                        }
                        return inside;
                    }
            
                } catch (err) {
                    console.log("Exception: " + err);
                }
            }
            
    }

  

    render() {
        return (
            <html>
 
               <body>
                  <main>
                  <Button href="/locations" variant="primary" size="lg">View Locations</Button>{' '}
                          <br></br><br></br>
                      <article>
                      <div class="d-flex justify-content-center mb-3">
                          <div className = "myTable" id = "myTable">
                              <div className = "myTable-row" id = "myTable-row">
                                  <div id="colorSelector1"></div> 
                                  <div id="colorSelector2"></div>
                                </div>
                            </div>
                            </div>
                        </article>
                    </main>
<br></br><br></br>
</body>
</html>
        )
    }
}