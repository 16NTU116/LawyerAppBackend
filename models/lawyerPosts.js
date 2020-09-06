const Joi = require('joi');
const mongoose = require('mongoose');

const LawyerPost = mongoose.model("LawyerPost", mongoose.Schema({
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
  jobType: {
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

function validateLawyer(lawyer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    id: Joi.string().required(),
    title: Joi.string().min(5).max(50).required(),
    details: Joi.string().min(5).max(300).required(),
    contact: Joi.string().min(5).max(11).required(),
    jobType: Joi.string().min(3).max(20).required(),
    postImage: Joi.string()
  };

  return Joi.validate(lawyer, schema);
}

exports.LawyerPost = LawyerPost;
exports.validate = validateLawyer;