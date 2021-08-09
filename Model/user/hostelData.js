const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const hostelSchema = new Schema({
    hname: { type: String, max: 100, required: true },
    rnumber: { type: String, max: 100, required: true },
    rtype: { type: String, required: true },
    bednumber: { type: String, required: true },
    bedcost: { type: String, required: true },
});

module.exports=mongoose.model("hostelData",hostelSchema)