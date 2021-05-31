const Joi = require('joi');
const mongoose = require('mongoose');
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    contact : {
        type: String,
        required : true,
        minlength : 5,
        maxlength : 11
    },
    address : {
        type : String,
        required: true,
        minlength : 5,
        maxlength : 50
    },
    about : {
        type : String,
        minlength : 5,
        maxlength : 200
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id}, config.get("jwtPrivateKey"));
}

const LUser = mongoose.model("LawyerUsers", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255),
        address: Joi.string().min(5).max(50).required(),
        contact: Joi.string().min(5).max(11).required(),
        about: Joi.string().min(5).max(200)
    };

    return Joi.validate(user, schema);
}

exports.User = LUser;
exports.validate = validateUser;