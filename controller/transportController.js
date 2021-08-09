const mongoose = require("mongoose");
const driver = require("../Model/user/driver");

exports.transportPost = async (req, res, next) => {
    var transportData = req.body;
    if (transportData) {
        transportData = JSON.parse(JSON.stringify(transportData));
        var data = {
            ruteName: transportData.ruteName,
            vechileNumber: transportData.vechileNumber,
            driverName: transportData.driverName,
            licenseNumber: transportData.licenseNumber,
            phNumber: transportData.phNumber ? Number(transportData.phNumber) : 0,
        };
        // console.log("data--->", data);
        const createDriver = await driver.create(data);
        if (createDriver) {
            res.send({ success: " Data added successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};
exports.transportDelete = async (req, res, next) => {
    var id = req.body.id;
    // console.log("id--->", id);
    if (id) {
        const deleteDriver = await driver.deleteOne({ _id: id });
        res.send({ success: "Record deleted successfully" });
    } else {
        res.send({ error: "Id is required" });
    }
};
exports.transportUpdate = async (req, res, next) => {
    var updateData = req.body;
    if (updateData) {
        updateData = JSON.parse(JSON.stringify(updateData));
        var data = {
            ruteName: updateData.ruteName,
            vechileNumber: updateData.vechileNumber,
            driverName: updateData.driverName,
            licenseNumber: updateData.licenseNumber,
            phNumber: updateData.phNumber ? Number(updateData.phNumber) : 0,
        };
        // console.log("data--->", data);
        const updateDriver = await driver.updateOne(
            { _id: updateData.id },
            { $set: data }
        );
        if (updateDriver) {
            res.send({ success: " Data updated successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
};
