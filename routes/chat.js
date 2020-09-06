const express = require('express');
const { Chat, validate } = require("../models/chat");
const router = express.Router();

router.post('/counter', async (req, res) => {
    let start = moment().startOf('day'); 
    let end = moment().endOf('day');

    let chat = await Chat.find({created_on: {$gte: start, $lt: end}}).count();
    console.log(chat);
    // res.json({
    //     success: 1,
    //     data: chat,
    //     message: "Chat Recevied"
    // });
});

module.exports = router;