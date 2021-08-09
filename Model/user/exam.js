const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const examSchema = new Schema({
  exam: { type: String, max: 100, required: true },
  class: { type: Number, max: 10, default: null },
  section: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, max: 20, required: true },
  totalMarks: { type: String, max: 20, required: true },
  duration: { type: String, max: 20, required: true },
  time: { type: String, max: 20, required: true },
});
module.exports = mongoose.model("exam", examSchema)
