const joi = require('@hapi/joi');

// Verify new profile registration details
const registerValidation = (data) => {
    let registerSchema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });

    return registerSchema.validate(data);
};

// Verify login details
const loginValidation = (data) => {
    let loginSchema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });

    return loginSchema.validate(data);
};

// Verify message sender details
const senderValidation = (data) => {
    let senderSchema = joi.object({
        name: joi.string().min(6).required(),
        contactNumber: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        message: joi.string().min(10).required()
    });

    return registerSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.senderValidation = senderValidation;
