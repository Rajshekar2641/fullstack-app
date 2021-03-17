"use strict";

const express=require('express')
const app=express.Router()
var LocationSchema = require('../models/location')
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// List all the locations

exports.findAll = (req, res) => {
    LocationSchema.find()
    .then(locations => {
        res.send(locations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error retrieving locations."
        });
    });
}
