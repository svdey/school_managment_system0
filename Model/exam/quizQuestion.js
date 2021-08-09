const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @constant
 * @description Entity name : submitTest,Constant test schema definition
 */
const optionSchema = new Schema({
  optionType: { type: String, default: null }, //1,2,3,4
  matching: { type: String, default: null },
  matchingOption: { type: String, default: null }, //A,B,C,D
  option: { type: String, default: null },
  isTrue: { type: String, default: null }, //Y/N
});
const quizQuestionSchema = new Schema({
  questionType: {
    type: String,
    default: null,
    required: true,
  }, //1=single,2=saq,3=true/false,4=fill in the blanks
  testId: { type: ObjectId, default: null, ref: "test" },
  questionNumber: {
    type: Number,
    default: null,
    required: true,
  },
  question: { type: String, default: null, required: true },
  levelId: { type: String, default: null, required: true },
  option: [optionSchema],
  createdBy: { type: ObjectId, default: null, ref: "User" },
  createdOn: { type: Date, default: Date.now() },
  createdByIp: { type: String, default: null },
  updatedBy: { type: ObjectId, default: null },
  updatedOn: { type: Date, default: Date.now() },
  updatedByIp: { type: String },
  status: { type: String, default: "Y", required: true },
});

export default quizQuestionSchema;
