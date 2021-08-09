const mongoose = require("mongoose");
const studentPromotion = require("../Model/user/studentPromotion");

// #studentPromotion
exports.studentPromotionPost = async (req, res, next) => {
    //console.log("teacher---->" , req.body)
    var studentPromotionData = req.body;
    if (studentPromotionData) {
      studentPromotionData = JSON.parse(JSON.stringify(studentPromotionData));
      var data = {
        current_session: studentPromotionData.current_session,
        promotiontosession:  studentPromotionData.promotiontosession,
        promotionfromsession: studentPromotionData.promotionfromsession,
        promotionsession: studentPromotionData.promotionsession,
      };
  
      const studentPromotion = await studentPromotion.create(data);
      if (studentPromotion) {
        res.send({ success: "studentPromotion added successfully" });
      } else {
        res.send({ error: "Something went wrong" });
      }
    }
  };
  // #endregion