const mongoose = require("mongoose");
const hostelTbl = require("../Model/user/hostelData");

exports.hostelPost = async (req, res , next) =>{
    var hostelData = req.body;
    // console.log("hostel--->",hostelData);

  if (hostelData) {
    hostelData = JSON.parse(JSON.stringify(hostelData));
    var data = {
        hname: hostelData.hname,
        rnumber: hostelData.rnumber ? Number(hostelData.rnumber) : 0,
        rtype: hostelData.rtype,
        bednumber: hostelData.bednumber ? Number(hostelData.bednumber) : 0,
        bedcost: hostelData.bedcost ? Number(hostelData.bedcost) : 0,
    };
    // console.log("data-->", data);
    const createhostelData = await hostelTbl.create(data);
    if (createhostelData) {
      res.send({ success: "data added successfully" });
    } else {
      res.send({ error: "Something went wrong" });
    }
  }
};
exports.hostelDelete = async (req, res, next) => {
  var id = req.body.id;
  // console.log("id--->", id);
  if (id) {
      const deletehostelDelete = await hostelTbl.remove({ _id: id });
      res.send({ success: "Record deleted successfully" });
  } else {
      res.send({ error: "Id is required" });
  }
};
exports.hostelUpdate = async (req, res, next) => {
  var updateData = req.body;
  if (updateData) {
      updateData = JSON.parse(JSON.stringify(updateData));
      var data = {
        hname: updateData.hname,
        rnumber: updateData.rnumber ? Number(updateData.rnumber) : 0,
        rtype: updateData.rtype,
        bednumber: updateData.bednumber ? Number(updateData.bednumber) : 0,
        bedcost: updateData.bedcost ? Number(updateData.bedcost) : 0,
      };
      // console.log("data--->", data);
      const updatehostel = await hostelTbl.updateOne(
          { _id: updateData.id },
          { $set: data }
      );
      if (updatehostel) {
          res.send({ success: " Data updated successfully" });
      } else {
          res.send({ error: "Something went wrong" });
      }
  }
};
