const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  userTypeId: { type: ObjectId, ref: "UserTypeMaster" },
  name: { type: String, max: 100, required: true },
  // userName: { type: String, required: true },
  class: { type: Number, max: 10, default: null },
  roll: { type: Number, default: null },
  admissionNo: { type: Number, default: null },
  section: { type: String, default: null },
  mobile: { type: String, max: 10, default: null },
  phone: { type: String, max: 10, default: null },
  lang: { type: String, max: 10, default: null },//for language
  scode:{type:String,max:20, default:null},//for school code
  jdate: { type: String, default: null },    // for joining date
  session: { type: String, max: 20, default: null }, //for session
  secondaryMobile: { type: String, max: 10, default: null },
  password: { type: String, default: null,  }, // i removed required: true
  email: {
    type: String,
    max: 100,
    default: null,
    required: true,
  },
  isEmailVerified: { type: String, default: "N" },
  gender: { type: String, default: null },
  religion: { type: String, default: null },
  title: { type: String, default: null }, //PHD,DR
  dob: { type: Date, default: null },
  address: { type: String, default: null },
  married: { type: String, default: null }, //M = Married, U = Unmarried
  govIdStatus: { type: String, default: "N" }, //Y=Approved,N=not Approved
  govtIdFilePath: { type: String, default: null },
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

module.exports=mongoose.model("user",userSchema)
