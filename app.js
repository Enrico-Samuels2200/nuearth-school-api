const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

require('dotenv/config');

// Import Routes
const sendRoute = require('./routes/send');
const authRoute = require('./routes/auth');

// Middleware (Uses the imported route from "routes" directory)
app.use(bodyParser.json({extended: true}));
app.use(cors());

// Use imported Routes
app.use('/api/send', sendRoute);
app.use('/auth', authRoute);

// Connect to DB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected")
})

// Listens on localhost to port specified.
app.listen(process.env.PORT || 3000);