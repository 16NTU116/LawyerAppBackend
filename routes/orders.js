const auth = require('../middlewares/auth');
const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Orders, validate } = require("../models/orders");
const { LawyerPost } = require("../models/lawyerPosts");
const { ClientPost } = require("../models/customer");
const { assign } = require('lodash');
const router = express.Router();

router.post('/receiveuser', async (req, res) => {
    const user = await Orders.find({ userId: req.body.userId });
    console.log("User at id: " + req.body.userId + ":: ", user);
    res.json(user);
});

router.post('/receiveclient', async (req, res) => {
    const user = await Orders.find({ clientId: req.body.clientId });
    console.log("User at id: " + req.body.clientId + ":: ", user);
    res.json(user);
});

// router.post('/all', async(req, res) => {
//   const user = await User.find();
//   console.log("User are "+ ":: ", user);
//   res.json(user);
// });

router.post('/', async (req, res) => {
    console.log("Data in router is: ", req.body);
    const { error } = validate(req.body);

    if (error) {
        console.log("Error is: ", error);
        return res.status(400).json({ message: error.details[0].message });
    }

    let order = new Orders({
        postId: req.body.postId,
        clientName: req.body.clientName,
        clientId: req.body.clientId,
        title: req.body.title,
        status: req.body.status,
        userId: req.body.userId,
        userName: req.body.userName,
        discription: req.body.discription,
        dated: new Date()
    });
    order = await order.save();

    res.json({
        success: 1,
        data: order,
        message: "Order Sent"
    });
});

router.put('/status', async (req, res) => {
    console.log(req.body);

    const user = await Orders.findByIdAndUpdate(req.body.id, {
        status: req.body.status,
    },
        { new: true });
    let result;
    if (req.body.status === "Accepted") {
        if (req.body.person === "lawyer") {
            result = await LawyerPost.findByIdAndUpdate(user.postId, {
                status: "assigned",
                assignTo: user.userId
            }, { new: true })
        }
        else
            result = await ClientPost.findByIdAndUpdate(user.postId, {
                status: "assigned",
                assignTo: user.userId
            }, { new: true })
    }


    res.json({
        success: 1,   
        data: user,
        message: "Status Updated"
    });
});

module.exports = router;