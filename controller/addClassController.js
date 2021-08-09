const mongoose = require("mongoose");
const addClass = require("../Model/user/addClass");

exports.addClassPost = async (req, res, next) => {
    // console.log("teacher---->" , req.body)
    var classData = req.body;
    if (classData) {
        classData = JSON.parse(JSON.stringify(classData));
        var data = {
            teacherName: classData.teacherName,
            sclass: classData.sclass,
            idno: classData.idno,
            mobile: classData.mobile,
            section: classData.section,
            subject: classData.subject,
            date: classData.date,
            gender: classData.gender,
            time: classData.time,
            email: classData.email,
        };
        const createaddClass = await addClass.create(data);
        if (createaddClass) {
            res.send({ success: "Class added successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};

exports.addClassDelete = async (req, res, next) => {
    var id = req.body.id;
    console.log("id--->", id);
    if (id) {
        const deleteTeacher = await addClass.deleteOne({ _id: id });
        res.send({ success: "Record deleted successfully" });
    } else {
        res.send({ error: "Id is required" });
    }
};
