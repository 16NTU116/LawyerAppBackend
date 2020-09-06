const express = require('express');
const router = express.Router();
const path = require('path');
const { LawyerPost, validate } = require("../models/lawyerPosts");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
    // cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  },
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else
    cb(null, false);
}

const uploads = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/me', async (req, res) => {
  let post = await LawyerPost.find({userId: req.body.id}).sort("title")
  res.json(post);
});

router.post('/all', async (req, res) => {
  let post = await LawyerPost.find().sort("title");
  res.json(post);
});

router.post('/search', async (req, res) => {
  console.log(req.body.search);
  let post = await LawyerPost.find({details : {$regex : `.*${req.body.search}.*`, '$options' : 'i'}});
  console.log(post);
  res.json(post);
});

router.post('/searchById', async (req, res) => {
  console.log(req.body.search);
  let post = await LawyerPost.find({userId: req.body.id, details : {$regex : `.*${req.body.search}.*`, '$options' : 'i'}});
  console.log(post);
  res.json(post);
});

router.post('/', async(req, res) => {
  // console.log("Image File is: ", req.file.path);
  console.log("Data is: ", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0});

  let customer = new LawyerPost({
    name: req.body.name,
    userId: req.body.id,
    contact: req.body.contact,
    title: req.body.title,
    details: req.body.details,
    jobType: req.body.jobType,
    status: "active",
    dated: new Date()
    // postImage: req.file.path
});
  customer = await customer.save();
  
  res.json({
    success: 1,
    data: customer,
    message: "Post is created"
  });
});
  
  module.exports = router;