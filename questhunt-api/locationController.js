const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const locationRoutes = express.Router();
const PORT = 4000;

var Location = require('./models/location');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/locations', { useNewUrlParser: true });
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
        .then(todo => {
            res.status(200).json({'Location': 'Location  added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Location failed');
        });
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});