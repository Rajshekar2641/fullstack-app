const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });

const connection= mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connection established successfully !!");
})

const locationsRouter = require('./controllers/locationController');


app.use('/locations', locationsRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
