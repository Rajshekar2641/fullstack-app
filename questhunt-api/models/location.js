const { NumberDecimal } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
    locationName: {
        type: String,
        unique: true,
        allowNull:false,
        required:true
    },
    latitude: {
        type: String,
        allowNull:false,
        required:true,
    },
    longitude: {
        type: String,
        allowNull:false,
        required:true
    },
    radius: {
        type: Number,
        allowNull:false,
        required:true
    }
})

module.exports = mongoose.model('Location', Location)
