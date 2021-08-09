const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const studentPaymentSchema = new Schema({
  name: { type: String, max: 100, required: true },
  id: { type: Number, required: true },
  myclass: { type: Number, default: null },
  section: { type: String, default: null },
  totalfee: { type: String, max: 10, default: null },
  paymentMethod: { type: String, max: 10, default: null },
  status: { type: String, max: 10, default: null },
  date: { type: Date,  default: null },
});

module.exports = mongoose.model("studentPayment", studentPaymentSchema)
