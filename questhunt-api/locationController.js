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


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
