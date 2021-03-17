"use strict";

var express = require('express')
var router = express.Router();

var locationController = require('../controllers/locationController')

 router.get('/locations', locationController.findAll)
 router.post('/addlocation/', locationController.create)  
 router.get('/locations/:locationId', locationController.findOne)            

module.exports =  router ;
