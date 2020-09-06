const express = require('express');
const { Complaint, validate } = require("../models/complaint");
// const { Genre } = require("../models/genres");
const router = express.Router();

router.post('/all', async(req, res) => {
  const feedback = await Complaint.find();
  console.log("Complaints are "+ ":: ", feedback);
  res.json(feedback);
});

router.post('/c', async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // const genre = await Genre.findById(req.body.genreId) 
  // if (!genre) return res.status(400).send(error.details[0].message);

  let complaint = new Complaint({
    complaintText: req.body.complaints,
    // genre: {
    //     _id : genre._id,
    //     name : genre.name
    // },
    // numberInStock: req.body.numberInStock,
    // dailyRentalRate: req.body.dailyRentalRate,
    userId: req.body.id,
    complaintBy: "Client"
  });
  complaint = await complaint.save();

  res.json({
    success: 1,
    data: complaint,
    message: "Complaint Sent"
  });
});

  router.post('/l', async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    // const genre = await Genre.findById(req.body.genreId) 
    // if (!genre) return res.status(400).send(error.details[0].message);

    let complaint = new Complaint({
      complaintText: req.body.complaints,
      // genre: {
      //     _id : genre._id,
      //     name : genre.name
      // },
      // numberInStock: req.body.numberInStock,
      // dailyRentalRate: req.body.dailyRentalRate,
      userId: req.body.id,
      complaintBy: "Lawyer"
    });
    complaint = await complaint.save();

    res.json({
      success: 1,
      data: complaint,
      message: "Complaint Sent"
    });

  });

  module.exports = router;