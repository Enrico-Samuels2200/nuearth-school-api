const mongoose = require('mongoose');

// Schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
        
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
});

module.exports = mongoose.model('User', userSchema);