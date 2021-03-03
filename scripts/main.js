import locationsArray from '../locations.js';

// let locationElement1 = document.getElementById("colorSelector1");
// let locationElement2 = document.getElementById("colorSelector2");
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
    return 'Page is fully loaded';
    console.log('Page is fully loaded');
}


var target = locationsArray[Math.floor(Math.random()*locationsArray.length)].Name;

function onClickColor1() {

    document.getElementById("colorSelector1").innerHTML = target;
    let utterance = new SpeechSynthesisUtterance(response.colorComponent1 + target);
    speechSynthesis.speak(utterance);


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
        status += response.colorComponent2Success + location.name;
        speak = response.colorComponent2Success + location.name;
    } else {
        status += response.colorComponent2failure;
        speak = response.colorComponent2failure;
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
export default isValidCoordinates;

