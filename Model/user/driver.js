const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const driverSchema = new Schema({
  driverName: { type: String, max: 100, required: true },
  ruteName: { type: String, max: 100, required: true },
  licenseNumber: { type: String, default: null },
  vechileNumber: { type: String, default: null },
  phNumber: { type: String, max: 100, default: null },
});

module.exports = mongoose.model("driver", driverSchema)
