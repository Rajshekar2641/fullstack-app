const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

locationRoutes.route('/').get(function(req, res) {
    Location.find(function(err, locations) {
        if (err) {
            console.log(err);
        } else {
            res.json(locations);
        }
    });
});
