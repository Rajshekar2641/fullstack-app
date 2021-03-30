const locationRoutes = require('express').Router();
var Location = require('../models/location');

locationRoutes.route('/').get(function(req, res) {
    Location.find(function(err, locations) {
        if (err) {
            console.log(err);
        } else {
            res.json(locations);
        }
    });
});

locationRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Location.findById(id, function(err, location) {
        res.json(location);
    });
});

locationRoutes.route('/add').post(function(req, res) {
    let location = new Location(req.body);
    location.save()
        .then(location => {
            res.status(200).json({'Location': 'Location  added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Location failed');
        });
});

locationRoutes.route('/update/:id').post(function(req, res) {
    Location.findById(req.params.id, function(err, location) {
        if (!location)
            res.status(404).send("Data not found");
        else
        location.locationName = req.body.locationName;
        location.latitude = req.body.latitude;
        location.longitude = req.body.longitude;
        location.radius = req.body.radius;

        location.save().then(location => {
                res.json('Location updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

locationRoutes.route('/delete/:id').delete(function(req, res) {
    Location.findByIdAndRemove(req.params.id, function(err, location) {
        if (!location)
            res.status(404).send("Location not found");

        else
        res.json('Location deleted!');
    });
});


module.exports = locationRoutes;
