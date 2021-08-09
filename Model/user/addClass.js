const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const addClasssSchema = new Schema({
  teacherName: { type: String, max: 100, required: true },
  subject: { type: String, default: null },
  sclass: { type: String, default: null },
  mobile: { type: Number, default: null },
  section: { type: String, default: null },
  idno: { type: Number, default: null },
  gender: { type: String, default: null },
  email: { type: String, max: 100, default: null },
  date: { type: String, default: null },
  time: { type: Number, default: null },
});

module.exports = mongoose.model("addClass", addClasssSchema)
