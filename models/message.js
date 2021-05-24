const mongoose = require('mongoose');

// Schema
const UserMessageSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Messages', UserMessageSchema);