const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const teachersSchema = new Schema({
  firstName: { type: String, max: 100, required: true },
  lastName: { type: String, max: 100, required: true },
  sclass: { type: String,default: null },
  section: { type: String,default: null },
  idno: { type: Number, default: null },
  phone: { type: Number, default: null },
  gender: { type: String, default: null},
  email: {
    type: String,
    max: 100,
    default: null,
  },
  dateofbirth: { type: String, default: null },
  religion: { type: String, default: null },
  subject: { type: String, default: null },
  address: { type: String, default: null },
  filePath: { type: String, default: null },
  lastLogin: { type: Date, default: Date.now() },
  createdBy: { type: ObjectId, default: null },
  createdOn: { type: Date, default: Date.now() },
  createdByIp: { type: String, max: 30 },
  updatedBy: { type: ObjectId },
  updatedOn: { type: Date, default: null },
  updatedByIp: { type: String, max: 30 },
  status: { type: String, max: 2, default: "N" },
});

module.exports=mongoose.model("teacher",teachersSchema)
