const Joi = require('joi');
const mongoose = require('mongoose');
const config = require("config");
const jwt = require("jsonwebtoken");

const orderSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    clientId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    userId: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        minlength: 2,
        maxlength: 100
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    status: {
        type: String,
        required: true,
    },
    dated: {
      type: Date,
      required: true,
    }
});

const Orders = mongoose.model("Orders", orderSchema);

function validateOrders(order) {
    const schema = {
        postId: Joi.string().required(),
        userId: Joi.string().required(),
        clientId: Joi.string().required(),
        userName: Joi.string().min(2).max(50).required(),
        clientName: Joi.string().min(2).max(50).required(),
        title: Joi.string().min(2).max(30).required(),
        discription: Joi.string(),
        status: Joi.string().required()
    };

    return Joi.validate(order, schema);
}

exports.Orders = Orders;
exports.validate = validateOrders;