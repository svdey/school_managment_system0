const mongoose = require("mongoose");
const addExpences = require("../Model/user/addExpences");

exports.addExpenses = async (req, res, next) => {
  var addExpenses = req.body;
  console.log("addExpenses--->", addExpenses);

  if (addExpenses) {
    addExpenses = JSON.parse(JSON.stringify(addExpenses));
    var data = {
      book: addExpenses.book,
      subject: addExpenses.subject,
      writer: addExpenses.writer,
      myclass: addExpenses.myclass ? Number(addExpenses.myclass) : 0,
      year: addExpenses.year,
      date: addExpenses.date,
      id: addExpenses.id ? Number(addExpenses.id) : 0
    };
    console.log("data-->", data);
    const createaddExpenses = await addExpences.create(data);
    if (createaddExpenses) {
      res.send({
        success: "data added successfully"
      });
    } else {
      res.send({
        error: "Something went wrong"
      });
    }
  }
};
exports.deleteExpence = async (req, res, next) => {
  var id = req.body.id;
  console.log("id--->", id);
  if (id) {
    const deletegradesDelete = await addExpences.remove({
      _id: id
    });
    res.send({
      success: "Record deleted successfully"
    });
  } else {
    res.send({
      error: "Id is required"
    });
  }
};