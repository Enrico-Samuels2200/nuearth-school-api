const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

require('dotenv/config');

// Import Routes
const sendRoute = require('./routes/send');

// Middleware (Uses the imported route from "routes" directory)
app.use(bodyParser.json({extended: true}));
app.use(cors());

// Imported Routes
app.use('/api/send', sendRoute);

// Connect to DB
mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected")
})

// Listens on localhost to port specified.
app.listen(process.env.port || 3000);