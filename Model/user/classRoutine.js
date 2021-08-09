const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const subjectSchema = new Schema({
  subjectname: { type: String, max: 100, required: true },
  subjecttype: { type: String, max: 100, required: true },
  subjectclass: { type: String, default: null },
  subjectcode: { type: Number, default: null }
});

module.exports = mongoose.model("classRoutine", subjectSchema)
