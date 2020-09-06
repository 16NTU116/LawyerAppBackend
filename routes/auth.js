const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();

router.post('/', async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email : req.body.email });
  if (!user) return res.status(400).json({ success: 0, message: "InvaliD Email or Password" });;

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).json({ success: 0, message: "InvaliD Email or Password" });;

  const token = user.generateAuthToken();
  // user = await User.find().sort("name");
  res.json({
    success: 1,
    data: user,
    token: token,
    message: "Login Successfull"
  });
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;