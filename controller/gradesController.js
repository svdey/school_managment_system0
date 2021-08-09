const mongoose = require("mongoose");
const gradesTbl = require("../Model/user/gradesData");

exports.gradesPost = async (req, res , next) =>{
    var gradesData = req.body;
    // console.log("grades--->",gradesData);

  if (gradesData) {
    gradesData = JSON.parse(JSON.stringify(gradesData));
    var data = {
      gname: gradesData.gname,
      gpoint: gradesData.gpoint ? Number(gradesData.gpoint) : 0,
      pfromt: gradesData.pfromt,
      pupto: gradesData.pupto ? Number(gradesData.pupto) : 0,
      comemnts: gradesData.comemnts,
    };
    // console.log("data-->", data);
    const creategradesData = await gradesTbl.create(data);
    if (creategradesData) {
      res.send({ success: "data added successfully" });
    } else {
      res.send({ error: "Something went wrong" });
    }
  }
};
exports.gradesDelete = async (req, res, next) => {
  var id = req.body.id;
  // console.log("id--->", id);
  if (id) {
      const deletegradesDelete = await gradesTbl.remove({ _id: id });
      res.send({ success: "Record deleted successfully" });
  } else {
      res.send({ error: "Id is required" });
  }
};
exports.gradesUpdate = async (req, res, next) => {
  var updateData = req.body;
  if (updateData) {
      updateData = JSON.parse(JSON.stringify(updateData));
      var data = {
        gname: updateData.gname,
        gpoint: updateData.gpoint ? Number(updateData.gpoint) : 0,
        pfromt: updateData.pfromt,
        pupto: updateData.pupto ? Number(updateData.pupto) : 0,
        comemnts: updateData.comemnts,
      };
      // console.log("data--->", data);
      const updategrades = await gradesTbl.updateOne(
          { _id: updateData.id },
          { $set: data }
      );
      if (updategrades) {
          res.send({ success: " Data updated successfully" });
      } else {
          res.send({ error: "Something went wrong" });
      }
  }
};
