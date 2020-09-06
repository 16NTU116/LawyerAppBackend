const Joi = require('joi');
const mongoose = require('mongoose');

const Chat = mongoose.model("Chat", mongoose.Schema({
  postId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  msg: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  }
}));

function validateChat(chat) {
  const schema = {
    name: Joi.string().min(1).max(20).required(),
    msg: Joi.string().min(1).max(20).required(),
    id: Joi.string().min(1).max(30).required(),
  };

  return Joi.validate(chat, schema);
}

exports.Chat = Chat;
exports.validate = validateChat;