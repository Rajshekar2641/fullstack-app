"use strict";

const express=require('express')
const app=express.Router()
var LocationSchema = require('../models/location')
let bodyParser = require('body-parser');


// app.use(bodyParser.urlencoded());

// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Add a location

exports.create = (req, res) => {
    console.log("Entered inside post",req);
    const location = new LocationSchema({
        locationName:req.body.locationName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 50,
      });
      console.log("created location schema");
     location.save(err => {
             if(err) {
                let status = err.status || err.statusCode || err.code || 500;
        res.status(status).send({ status, error: err });
             }
                 res.send({ status: 200, response: "Added location succesfully" });
      } )
}


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

// Get loaction by Id


exports.findOne = (req, res) => {
    LocationSchema.findById(req.params.locationId)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location 404  " + req.params.locationId
            });            
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving location with id " + req.params.locationId
        });
    });
}

// Update the location

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    LocationSchema.findByIdAndUpdate(req.params.productId, {
        locationName : req.body.locationName,
    }, {new: true})
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "LocationId not found with id " + req.params.locationId
            });
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.locationId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.locationId
        });
    });
}

