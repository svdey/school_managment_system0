const mongoose = require("mongoose");
const teacher = require("../Model/user/teacher");

exports.teacherPost = async  (req, res, next) => {
    //  console.log("teacher---->" , req.body)
     var teacherData = req.body;
     if (teacherData) {
       teacherData = JSON.parse(JSON.stringify(teacherData));
       var data = {
         firstName: teacherData.firstName,
         lastName: teacherData.lastName,
         sclass: teacherData.sclass,
         idno: teacherData.idno,
         phone: teacherData.phone,
         section: teacherData.section,
         subject: teacherData.subject,
         address: teacherData.address,
         gender: teacherData.gender,
         religion: teacherData.religion,
         dateofbirth: teacherData.dateofbirth,
         email: teacherData.email,
       };
       const createteacher = await teacher.create(data);
       if (createteacher) {
         res.send({ success: "Teacher added successfully" });
       } else {
         res.send({ error: "Something went wrong" });
       }
     }
   };

exports.teacherDelete = async (req, res, next) => {
    var id = req.body.id;
     console.log("id--->", id);
    if (id) {
        const deleteTeacher = await teacher.deleteOne({ _id: id });
        res.send({ success: "Record deleted successfully" });
    } else {
        res.send({ error: "Id is required" });
    }
};
   

exports.teacherUpdate = async (req, res, next) => {
    var updateData = req.body;
    if (updateData) {
        updateData = JSON.parse(JSON.stringify(updateData));
        var data = {
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            sclass: updateData.sclass,
            idno: updateData.idno,
            section: updateData.section,
            subject: updateData.subject,
            address: updateData.address,
            gender: updateData.gender,
            religion: updateData.religion,
            dateofbirth: updateData.dateofbirth,
            email: updateData.email,
            phone: updateData.phone ? Number(updateData.phone) : 0,
        };
        // console.log("data--->", data);
        const updateTeacher = await teacher.updateOne(
            { _id: updateData.id },
            { $set: data }
        );
        if (updateTeacher) {
            res.send({ success: "Data updated successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};