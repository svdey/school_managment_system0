const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const parentsSchema = new Schema({
  studentId: { type: ObjectId, ref: "user" },
  fatherName: { type: String, max: 100, required: true },
  mothername: { type: String, max: 100, required: true },
  fatherOccupation: { type: String,default: null },
  motherOccupation: { type: String, default: null },
  mobile: { type: String, max: 10, default: null },
  password: { type: String, default: null},
  email: {
    type: String,
    max: 100,
    default: null,
  },
  isEmailVerified: { type: String, default: "N" },
  gender: { type: String, default: null },
  religion: { type: String, default: null },
  nationality: { type: String, default: null },
  dob: { type: Date, default: null },
  address: { type: String, default: null },
  bloodGroup: { type: String, default: null },
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

module.exports=mongoose.model("parent",parentsSchema)
