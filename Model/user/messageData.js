const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new Schema({
  title: { type: String, max: 100, required: true },
  recipient: { type: String, max: 100, required: true },
  message: { type: String, default: null },
});

module.exports = mongoose.model("message", messageSchema)
