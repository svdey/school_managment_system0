const message = require("../Model/user/messageData");
const mongoose = require("mongoose");

exports.messageCreate = async (req, res, next) => {
    var messageData = req.body;
    if (messageData) {
        messageData = JSON.parse(JSON.stringify(messageData));
        var data = {
            title: messageData.title,
            recipient: messageData.recipient,
            message: messageData.message,
        };
        // console.log("data--->", data);
        const createMessage = await message.create(data);
        if (createMessage) {
            res.send({ success: "Message Sent Successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};