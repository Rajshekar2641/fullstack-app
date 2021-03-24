const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const locationRoutes = express.Router();

var Location = require('./models/location');
app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/locations', { useNewUrlParser: true });
mongoose.connect('process.env.MONGO_URI',  { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

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

app.use('/locations', locationRoutes);

app.listen(process.env.PORT||4000, function() {
    console.log("Server is running on Port: " + PORT);
});
