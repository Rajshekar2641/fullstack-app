const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
    locationName: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    radius: {
        type: Number
    }
})

module.exports = mongoose.model('Location', Location)
