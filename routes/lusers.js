const { validate } = require("../models/lusers");
const auth = require('../middlewares/auth');
const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/lusers");
const router = express.Router();

router.post('/me', async(req, res) => {
  const user = await User.findById(req.body.id);
  console.log("User at id: " + req.body.id + ":: ", user);
  res.json(user);
});

router.post('/all', async(req, res) => {
  const user = await User.find();
  console.log("User are "+ ":: ", user);
  res.json(user);
});

router.post('/', async(req, res) => {
  console.log("Data in router is: ", req.body);
  const { error } = validate(req.body); 
  
  if (error) {
    console.log("Error is: ", error);
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email : req.body.email });
  if (user) return res.status(400).json({ message: "Email already registered." });

  user = new User(_.pick(req.body, ["name", "email", "password", "contact", "address"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.json({
    success: 1,
    data: _.pick(user, ["name", "email", "password", "contact", "address"]),
    token: token,
    message: "Resgistration Successfull"
  });
});

router.put('/:id', async(req, res) => {
  console.log(req.body);
  const { error } = validate(req.body); 
  if (error) return res.status(400).json({ message: error.details[0].message });
  
  const user = await User.findByIdAndUpdate(req.params.id, { 
      name : req.body.name,
      email: req.body.email,
      // password : req.body.password,
      contact: req.body.contact,
      address : req.body.address,
      about: req.body.about,
   }, 
   { new : true });

  if (!user) return res.status(404).json('The genre with the given ID was not found.');
  
  res.json({
    success: 1,
    data: _.pick(user, ["name", "email", "password", "contact", "address", "about"]),
    message: "User Updated"
  });
});

module.exports = router;