const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {registerValidation, loginValidation} = require('../validation')

// User Register
router.post('/register', async (req, res) => {
    
    //Validates the data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Check if user email exist
        const emailExist = await userModel.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send("Email already exist.");

        // Create new user
        const userData = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

    // Returns a promise
    try{
        await userData.save();
        res.send({user: userData._id});
    }
    catch(err) {
        res.json({message: err});
    };
});

// User Login
router.post('/login', async (req, res) => {
    
    //Validates the data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        // Create new user
        const userData = new userModel({
            email: req.body.email,
            password: req.body.password
        });

        // Check if user email exist
        const user = await userModel.findOne({email: req.body.email});
        if(!user) return res.status(400).send("Invalid email or password entered.");

        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid email or password entered.')

        // Create and assign token
        const token = jwt.sign({_id: userData._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);


});

// Exports the routes as a package.
module.exports = router;