const { Chat, validate } = require('../models/chat');

module.exports = function (io) {
    io.on("connection", async (socket) => {
        const id = socket.request._query['ids'];
        console.log("Post Id: ", id);
        let res = await Chat.find({ postId: id }).sort("timestamp").select("_id name msg");
        console.log("Before emitting: ", res);
        if(res.length < 1)
            res = { name: "Admin", msg: "New Chat Has Started" }
        if(res.length == 1)
            res = res[0]; 
        console.log(res);
        io.emit("chat message", res);
        socket.on("chat message", async (data) => {

            let name = data.name;
            let message = data.message;

            // Check for name and message
            if (name == '' || message == '') {
                // Send error status
            } else {
                let chat = new Chat({
                    name: data.name,
                    msg: data.msg,
                    timestamp: new Date(),
                    postId: data.id
                });
                // Insert message
                chat = await chat.save();
                console.log(chat);
                io.emit("chat message", data);
            };
        })

    })
}