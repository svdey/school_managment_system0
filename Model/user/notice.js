const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const noticeSchema = new Schema({
  title: { type: String, max: 100, required: true },
  details: { type: String, required: true },
  posted_by: { type: String, max: 100, required: true },
  date: { type: String, default: null },
});

module.exports = mongoose.model("notice", noticeSchema);
