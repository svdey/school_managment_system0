const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @constant
 * @description Entity name : userTypeMaster, Constant userTypeMaster schema definition
 */
const userTypeMasterSchema = new Schema({
  userType: { type: String, required: true },
  createdBy: { type: ObjectId, default: null },
  createdOn: { type: Date, default: Date.now() },
  createdByIp: { type: String, default: null },
  updatedBy: { type: ObjectId, default: null },
  updatedOn: { type: Date, default: Date.now() },
  updatedByIp: { type: String },
  status: { type: String, default: "Y", required: true },
});

module.exports=mongoose.model("userType",userTypeMasterSchema)
