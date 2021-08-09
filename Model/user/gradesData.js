const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const gradesSchema = new Schema({
    gname: { type: String, max: 100, required: true },
    gpoint: { type: String, max: 100, required: true },
    pfromt: { type: String, required: true },
    pupto: { type: String, required: true },
    comemnts: { type: String, required: true },
});

module.exports=mongoose.model("gradesData",gradesSchema)