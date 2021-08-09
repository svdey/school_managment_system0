// const mongoose = require("mongoose");
// const addExpences = require("../Model/user/addExpences");

// exports.allExpenses = async (req, res, next) => {
//   var id = req.body.id;
//   console.log("id--->", id);
//   if (id) {
//     const deletegradesDelete = await addExpences.remove({
//       _id: id
//     });
//     res.send({
//       success: "Record deleted successfully"
//     });
//   } else {
//     res.send({
//       error: "Id is required"
//     });
//   }
// };