const mongoose = require("mongoose");
const addmissionForm = require("../Model/user/addmissionForm");
const common=require("../utility/common")
// #region addmission form
exports.addmissionFormPost = async (req, res, next) => {
    // console.log("teacher---->" ,req.body)
    var addmissionFormData = req.body;
    
    if (addmissionFormData.studentDetail) {
      addmissionFormData = JSON.parse(addmissionFormData.studentDetail);
      console.log(addmissionFormData);
      var data = {
        std_name: addmissionFormData.std_name,
        lastname: addmissionFormData.lastname,
        gender: addmissionFormData.gender,
        class_study: addmissionFormData.class_study,
        section: addmissionFormData.section,
        dob: addmissionFormData.dob,
        roll: addmissionFormData.roll,
        add_no: addmissionFormData.add_no,
        religon: addmissionFormData.religon,
        email: addmissionFormData.email,
        father_name: addmissionFormData.father_name,
        mother_name: addmissionFormData.mother_name,
        father_occup : addmissionFormData.father_occup ,
        mother_occup: addmissionFormData.mother_occup,
        mobile: addmissionFormData.mobile,
        nationality: addmissionFormData.nationality,
        address: addmissionFormData.address,
        permt_address: addmissionFormData.permt_address,
        
      };
//  console.log(data)
      const createaddmissionForm = await addmissionForm.create(data);
      if (createaddmissionForm) {
        //Send mail to parent
        let email=createaddmissionForm.email;
        let subject="Addmission successfull";
        let data="<h1>Your admission with STEP TO SOFT successfully done</h1>"
       const mailSent= await common.mail(email,subject,data);
       if(mailSent){
        res.send({ success: "student added successfully and mail sent" });
       }else{
        res.send({ success: "student added successfully but mail not sent" });
       }
       
      } else {
        res.send({ error: "Something went wrong" });
      }
    }
  };
  // #endregion

  // delete
  exports.addmissionFormDelete = async (req, res, next) => {
    var id = req.body.id;
     console.log("id--->", id);
    if (id) {
        const studentDelete = await addmissionForm.deleteOne({ _id: id });
        res.send({ success: "Record deleted successfully" });
    } else {
        res.send({ error: "Id is required" });
    }
};

exports.addmissionFormUpdate = async (req, res, next) => {
  var updateData = req.body;
  if (updateData) {
      updateData = JSON.parse(JSON.stringify(updateData));
      var data = {
        std_name: updateData.std_name,
        lastname: updateData.lastname,
        gender: updateData.gender,
        class_study: updateData.class_study,
        section: updateData.section,
        dob: updateData.dob,
        roll: updateData.roll,
        email: updateData.email,
        father_name: updateData.father_name,
        mobile: updateData.mobile,
        address: updateData.address,
      };
      // console.log("data--->", data);
      const updateStudent = await addmissionForm.updateOne(
          { _id: updateData.id },
          { $set: data }
      );
      if (updateStudent) {
          res.send({ success: "Data updated successfully" });
      } else {
          res.send({ error: "Something went wrong" });
      }
  }
};