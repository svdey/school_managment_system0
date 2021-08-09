const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const addExpencesSchema = new Schema({
  book: { type: String, max: 100, required: true },
  subject: { type: String, max: 100, required: true },
  writer: { type: String, default: null },
  myclass: { type: Number, default: null },
  year: { type: Number, default: null },
  date: { type: Date, default: null },
  id: { type: Number, default: null },
});

module.exports = mongoose.model("addExpences", addExpencesSchema)
