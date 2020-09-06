const Joi = require('joi');
const mongoose = require('mongoose');

const ClientPost = mongoose.model("ClientPost", mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  details: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 300
  },
  contact: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 11
  },
  type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  postImage: {
    type: String,
    // required: true
  },
  status: {
    type: String,
    required: true,
  },
  assignTo: {
    type: String,
  },
  dated: {
    type: Date,
    required: true,
  }
}));

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    id: Joi.string().required(),
    title: Joi.string().min(5).max(50).required(),
    details: Joi.string().min(5).max(300).required(),
    contact: Joi.string().min(5).max(11).required(),
    type: Joi.string().min(3).max(20).required(),
    postImage: Joi.string()
    // image: Joi.string().required(),
  };

  return Joi.validate(customer, schema);
}

exports.ClientPost = ClientPost;
exports.validate = validateCustomer;