const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const studentPromotionsSchema = new Schema({
    current_session: { type: String, max: 100, required: true },
    promotetosession: { type: String, max: 100, required: true },
    promotionfromsession: { type: String,default: null },
    promotionsession: { type: String,default: null },
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

module.exports=mongoose.model("studentPromotion",studentPromotionsSchema)
