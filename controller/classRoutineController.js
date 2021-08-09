const mongoose = require("mongoose");
const clsRutTab = require("../Model/user/classRoutine");

exports.classRoutine = async (req, res , next) =>{
    var classRoutine = req.body;
    console.log("classRoutine--->",classRoutine);

  if (classRoutine) {
    classRoutine = JSON.parse(JSON.stringify(classRoutine));
    var data = {
      subjectname: classRoutine.subjectname,
      subjecttype: classRoutine.subjecttype,
      subjectclass: classRoutine.subjectclass,
      subjectcode: classRoutine.subjectcode ? Number(classRoutine.subjectcode) : 0 
    };
    console.log("data-->", data);
    const createClassRoutine = await clsRutTab.create(data);
    if (createClassRoutine) {
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
