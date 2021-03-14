"use strict";

var express = require('express')
var router = express.Router();

var locationController = require('../controllers/locationController')

 router.get('/location/', locationController.findAll)                 

module.exports =  router ;
