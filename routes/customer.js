const express = require('express');
const router = express.Router();
const path = require('path');
const { ClientPost, validate } = require("../models/customer");
const { LawyerPost } = require("../models/lawyerPosts");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
    // cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
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
  let post = await ClientPost.find({ userId: req.body.id, status: "active" }).sort("dated")
  res.json(post);
});

router.post('/assigned', async (req, res) => {
  let post = await ClientPost.find({ userId: req.body.id, status: "assigned" }).sort("dated")
  res.json(post);
});

router.post('/all', async (req, res) => {
  let post;
  if (req.body.person === "client")
    post = await ClientPost.find({ status: 'active' }).sort("dated");
  else
    post = await LawyerPost.find({ status: 'active' }).sort("dated");
  res.json(post);
});

router.post('/allassigned', async (req, res) => {
  let post;
  if (req.body.person = "client")
    post = await ClientPost.find({ assignTo: req.body.id, status: 'assigned' }).sort("dated");
  else
    post = await LawyerPost.find({ assignTo: req.body.id, status: 'assigned' }).sort("dated");
  res.json(post);
});

router.post('/search', async (req, res) => {
  let post;
  console.log("Data send in: ", req.body)
  if (req.body.person === "client")
    post = await ClientPost.find({ details: { $regex: `.*${req.body.search}.*`, '$options': 'i' }, status: req.body.status });
  else
    post = await LawyerPost.find({ details: { $regex: `.*${req.body.search}.*`, '$options': 'i' }, status: req.body.status });
  res.json(post);
  console.log("Data send out: ", post)
});

router.post('/byCategory', async (req, res) => {
  let post = await ClientPost.find({ type: req.body.type, status: 'active' });
  res.json(post);
});

router.post('/searchById', async (req, res) => {
  console.log(req.body.search);
  let post = await ClientPost.find({ userId: req.body.id, details: { $regex: `.*${req.body.search}.*`, '$options': 'i' } });
  console.log(post);
  res.json(post);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message, success: 0 });

  let customer = new ClientPost({
    name: req.body.name,
    userId: req.body.id,
    contact: req.body.contact,
    title: req.body.title,
    details: req.body.details,
    type: req.body.type,
    status: "active",
    dated: new Date(),
    postImage: req.body.postImage
  });
  customer = await customer.save();

  res.json({
    success: 1,
    data: customer,
    message: "Post is created"
  });
});

// router.put('/:id', async(req, res) => {
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);

//     const customer = await ClientPost.findByIdAndUpdate(req.params.id, { 
//         name : req.body.name,
//         phone: req.body.phone,
//         isGold: req.body.isGold
//      }, 
//      { new : true });

//     if (!customer) return res.status(404).send('The genre with the given ID was not found.');

//     res.send(customer);
//   });

// router.delete('/:id', async(req, res) => {
//   const customer = await ClientPost.findByIdAndRemove(req.params.id); 

//   if (!customer) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(customer);
// });

// router.get('/:id', async(req, res) => {
//   const customer = await Customer.findById(req.params.id);

//   if (!customer) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(customer);
// });

module.exports = router;