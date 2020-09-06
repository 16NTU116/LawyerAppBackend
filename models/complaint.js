const Joi = require('joi');
const mongoose = require('mongoose');
// const { genreSchema } = require("./genres");

const Complaint = mongoose.model("Complaint", mongoose.Schema({
  complaintText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  userId: {
    type: String,
    required: true,
  },
  complaintBy: {
    type: String,
    required: true,
  }
}));

function validateComplaint(complaint) {
  const schema = {
    complaints: Joi.string().min(1).max(300).required(),
    id: Joi.string().required(),
  };

  return Joi.validate(complaint, schema);
}

exports.Complaint = Complaint;
exports.validate = validateComplaint;