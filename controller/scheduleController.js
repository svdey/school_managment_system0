const exam = require("../Model/user/exam");
const mongoose = require("mongoose");

exports.examScheduleCreate = async (req, res, next) => {
    var scheduleData = req.body;
    if (scheduleData) {
        scheduleData = JSON.parse(JSON.stringify(scheduleData));
        var data = {
            exam: scheduleData.exam,
            class: scheduleData.class,
            section: scheduleData.section,
            subject: scheduleData.subject,
            date: scheduleData.date,
            totalMarks: scheduleData.totalMarks,
            duration: scheduleData.duration,
            time: scheduleData.time,
        };
        console.log("exam--->", data);
        const createExam = await exam.create(data);
        if (createExam) {
            res.send({ success: "Exam Schedule Added Successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};
exports.scheduleDelete = async (req, res, next) => {
    var id = req.body.id;
    // console.log("id--->", id);
    if (id) {
        const deleteSchedule = await exam.deleteOne({ _id: id });
        res.send({ success: "Record deleted successfully" });
    } else {
        res.send({ error: "Id is required" });
    }
};
exports.scheduleUpdate = async (req, res, next) => {
    var updateData = req.body;
    if (updateData) {
        updateData = JSON.parse(JSON.stringify(updateData));
        var data = {
            exam: updateData.exam,
            subject: updateData.subject,
            class: updateData.Class,
            section: updateData.section,
            time: updateData.time,
            totalMarks: updateData.totalMarks,
            duration: updateData.duration,
            date: updateData.date,
        };
        // console.log("data--->", data);
        const updateSchedule = await exam.updateOne(
            { _id: updateData.id },
            { $set: data }
        );
        if (updateSchedule) {
            res.send({ success: " Data updated successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};