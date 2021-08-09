const mongoose = require("mongoose");
const stdPayTbl = require("../Model/user/studentPayment");

exports.studentPayment = async (req, res , next) =>{
    var studentPayment = req.body;
    console.log("studentPayment--->",studentPayment);

  if (studentPayment) {
    studentPayment = JSON.parse(JSON.stringify(studentPayment));
    var data = {
      name: studentPayment.name,
      id: studentPayment.id ? Number(studentPayment.id) : 0,
      myclass: studentPayment.myclass,
      section: studentPayment.section,
      totalfee: studentPayment.totalfee,
      paymentMethod: studentPayment.paymentMethod,
      status: studentPayment.status,
      date: studentPayment.date      
    };
    // console.log("data-->", data);
    const createStudentPayment = await stdPayTbl.create(data);
    if (createStudentPayment) {
      res.send({ success: "data added successfully" });
    } else {
      res.send({ error: "Something went wrong" });
    }
  }
};
// exports.studentPaymentDelete = async (req, res, next) => {
//   var id = req.body.id;
//   // console.log("id--->", id);
//   if (id) {
//       const deletegradesDelete = await stdPayTbl.remove({ _id: id });
//       res.send({ success: "Record deleted successfully" });
//   } else {
//       res.send({ error: "Id is required" });
//   }
// };
