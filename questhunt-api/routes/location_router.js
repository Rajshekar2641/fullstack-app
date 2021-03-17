"use strict";

var express = require('express')
var router = express.Router();

var locationController = require('../controllers/locationController')

 router.get('/locations', locationController.findAll)
 router.post('/addlocation/', locationController.create)  
 router.get('/locations/:locationId', locationController.findOne)  
router.put('/locations/:locationId', locationController.update)
 router.delete('/locations/:locationId', locationController.delete)

module.exports =  router ;
