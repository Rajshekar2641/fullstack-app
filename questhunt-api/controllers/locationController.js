"use strict";

const express=require('express')
const app=express.Router()
var LocationSchema = require('../models/location')
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



exports.create = (req, res) => {
    const location = new LocationSchema({
        locationName: req.body.locationName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 100,
      });
     location.save(err => {
             if(err) {
                let status = err.status || err.statusCode || err.code || 500;
        res.status(status).send({ status, error: err });
             }
                 res.send({ status: 200, response: "Location Create Successfully" });
      } )
}

// List all the locations

exports.findAll = (req, res) => {
    LocationSchema.find()
    .then(locations => {
        res.send(locations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving locations."
        });
    });
}