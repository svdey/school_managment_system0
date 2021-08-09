var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const teacherController = require("../controller/teacherController");
const adminController = require("../controller/adminController");
const noticeController = require("../controller/noticeController");
const accountSettingController = require('../controller/accountSettingController');
var multer = require('multer');
var upload = multer({ dest: 'public/images/' });

// #region all model
//const userType = require("../Model/user/UserTypeMaster");
//const user = require("../Model/user/User");
//const parent = require("../Model/user/parent");
// const notice = require("../Model/user/notice");
const transportController = require("../controller/transportController");
const scheduleController = require("../controller/scheduleController");
const hostelController = require("../controller/hostelController");
const gradesController = require("../controller/gradesController");
const messageController = require("../controller/messageController");
const addmissionFormController = require("../controller/addmissionFormController");
const studentPromotionController = require("../controller/studentPromotionController");
const studentPaymentController = require("../controller/studentPaymentController");
const classRoutineController = require("../controller/classRoutineController");
const addClassController = require("../controller/addClassController");
const addExpencesController = require("../controller/addExpencesController");



// #region all model
// const userType = require("../Model/user/UserTypeMaster");
// const user = require("../Model/user/User");
// const parent = require("../Model/user/parent");

// #region all model
//const userType=require("../Model/user/UserTypeMaster");
//const user=require("../Model/user/User");
//const parent=require("../Model/user/parent");



// #region All model
const userType = require("../Model/user/UserTypeMaster");
const user = require("../Model/user/User");
const parent = require("../Model/user/parent");
const addExpences = require("../Model/user/addExpences");
const driver = require("../Model/user/driver");

const exam = require("../Model/user/exam");
const teacher = require("../Model/user/teacher");
const hostelData = require("../Model/user/hostelData");
const gradesData = require("../Model/user/gradesData");
const notice = require("../Model/user/notice");
const addmissionForm = require("../Model/user/addmissionForm");
const studentPromotion = require("../Model/user/studentPromotion");
const classRoutine = require("../Model/user/classRoutine");
const addClass = require("../Model/user/addClass");

// #endregion
/* GET home page.  */
const isValid = (req, res, next) => {
  var cookie = req.cookies.token;
  if (cookie) {
    next();
  } else {
    res.redirect("/");
  }
};
// router.get("/add-user-type",async function (req, res, next) {
//   const userTypeData=req.query.userType
//   if(userTypeData){
//     const createResponse =await userType.create({ userType: userTypeData})
//     res.send({
//       message:"usertype added successfully",
//       data:req.query.userType
//     })
//   }else{
//     res.send({
//       message:"Please send some data in Query",
//     })
//   }

// });

// #region add teacher
// #endregion

router.get("/", function (req, res, next) {
  res.render("./admin/pages/adminLogin", {
    title: "login"
  });
});
router.get("/user-type", function (req, res, next) {
  res.render("./admin/pages/userType");
});
router.get("/admin-login", function (req, res, next) {
  res.render("./admin/pages/adminLogin", {
    title: "login"
  });
});
router.get("/logout", function (req, res, next) {
  res.clearCookie("token");
  res.render("./admin/pages/adminLogin", {
    title: "login"
  });
});
router.get("/admin-signup", function (req, res, next) {
  res.render("./admin/pages/adminSignup", {
    title: "Signup"
  });
});
router.post("/signup-data", async function (req, res, next) {
  if (req.body) {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log("req.body-->", req.body);
    var email = req.body.email;
    var name = req.body.name;
    const isUserTypeExist = await userType.findOne({ userType: "admin" });
    if (isUserTypeExist) {
      const isUserExist = await user.findOne({ email: email });
      if (!isUserExist) {
        var password = req.body.password;
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            // Store hash in your password DB.
            var data = {
              userTypeId: isUserTypeExist._id,
              email: email,
              name: name,
              password: hash,
              status: "N",
              createdOn: Date.now(),
              updatedOn: Date.now(),
            };
            const createResponse = await user.create(data);
            if (createResponse) {
              res.send({
                success: "user registered successfully"
              });
            } else {
              res.send({
                error: "something went wrong"
              });
            }
          });
        });
      } else {
        res.send({
          error: "user already exist"
        });
      }
    } else {
      res.send({ error: "user type not exist" });
    }

  }
});
router.get("/logout", function (req, res, next) {
  res.clearCookie("token");
  res.render("login", {
    title: "Login"
  });
});
router.post("/login-data", async function (req, res, next) {
  if (req.body) {
    req.body = JSON.parse(JSON.stringify(req.body));
    var email = req.body.email;
    var password = req.body.password;
    const isUserExist = await user.findOne({
      email: email
    });
    if (isUserExist) {
      // email match
      bcrypt.compare(
        password,
        isUserExist.password,
        async function (err, result) {
          // result === true
          if (result) {
            //jwt
            await jwt.sign({
              data: isUserExist,
            },
              "mysecret", {
              expiresIn: 60 * 60
            },
              (err, token) => {
                if (err) {
                  console.log(err);
                } else {
                  res.cookie("token", token);
                  res.send({
                    success: "login success"
                  });
                }
              }
            );
          } else {
            res.send({
              error: "Password not match"
            });
          }
        }
      );
    } else {
      res.send({
        error: "user not found"
      });
    }
  }
});
// router.get("/StudentDetail", function (req, res, next) {
//   res.render("./admin/pages/StudentDetail");
// });
//addminDashbord
router.get("/adminDashboard", isValid, function (req, res, next) {
  res.render("./dashbord/pages/adminDashboard");
});
//studentDashbord
router.get("/studentDashboard", isValid, function (req, res, next) {
  res.render("./dashbord/pages/studentDashboard");
});
//parentsDashbord
router.get("/parentsDashbord", isValid, function (req, res, next) {
  res.render("./dashbord/pages/parentsDashbord");
});

//addmissionForm
router.get("/addmissionForm", isValid, function (req, res, next) {
  res.render("./student/pages/addmissionForm");
});

//AllStudent
router.get("/allStudent", isValid, async function (req, res, next) {
  const  addmissionlist = await addmissionForm.find({});
  console.log("addmissionlist--->",addmissionlist)
  res.render("./student/pages/allStudent" , { addmissionlist}); 
});
router.post("/addmissionForm-add", addmissionFormController.addmissionFormPost);
router.post("/student-delete", addmissionFormController.addmissionFormDelete);
router.post("/student-update", addmissionFormController.addmissionFormUpdate);
//studentDetail
router.get("/studentDetail", isValid, async function (req, res, next) {
  var id = req.query.id
  // var filter = {}
  // if (id) filter._id = id
  var obj = await addmissionForm.findOne({_id:id});
  res.render("./student/pages/studentDetail", { data: obj });
});
//studentPromotion
router.get("/studentPromotion", isValid, function (req, res, next) {
  res.render("./student/pages/studentPromotion");
});
router.post("/studentPromotion-data", studentPromotionController.studentPromotionPost)
//allTeachers
router.get("/allTeachers", isValid, async function (req, res, next) {
  const teacherList = await teacher.find();
  res.render("./teacher/pages/allTeachers", { teacherList: teacherList });

});
router.post("/teacher-add", teacherController.teacherPost);
router.post("/teacher-delete", teacherController.teacherDelete);
router.post("/teacher-update", teacherController.teacherUpdate);

//teachersDetail
router.get("/teachersDetail", isValid, async function (req, res, next) {
  var id = req.query.id
  var filter = {}
  if (id) filter._id = id
  var obj = await teacher.findOne(filter)
  res.render("./teacher/pages/teachersDetail", { data: obj });
});
router.get("/student-card-list", isValid, async function (req, res, next) {
  const searchFilter={};
  studentId=req.query.studentId;
  if(studentId){
    searchFilter._id=studentId
  }
  var studentList = await addmissionForm.find(searchFilter);
  console.log("studentList-->",studentList);
  res.render("./student/pages/studentList", { studentList: studentList });
});
router.get("/student-card", isValid, async function (req, res, next) {
  // var studentList = await addmissionForm.find({});
  res.render("./student/pages/studentCard");
});
//addTeachers
router.get("/addTeachers", isValid, function (req, res, next) {
  res.render("./teacher/pages/addTeachers");
});
//parentList
router.get("/parentList", isValid, function (req, res, next) {
  res.render("./parent/pages/parentList");
});
//addBook
router.get("/addBook", isValid, function (req, res, next) {
  res.render("./book/pages/addBook");
});
//allBook
router.get("/allBook", isValid, function (req, res, next) {
  res.render("./book/pages/allBook");
});
//feesCollection
router.get("/feesCollection", isValid, function (req, res, next) {
  res.render("./account/pages/feesCollection");
});
//studentPayment
router.get("/studentPayment", isValid, function (req, res, next) {
  res.render("./account/pages/studentPayment");
});
router.post("/student-payment", isValid, studentPaymentController.studentPayment);
//allExpenses
router.get("/allExpenses", isValid, function (req, res, next) {
  res.render("./account/pages/allExpenses");
});
router.post("/expense-delete", addExpencesController.deleteExpence);
//addExpenses
router.get("/addExpenses", isValid, function (req, res, next) {
  res.render("./account/pages/addExpenses");
});
router.post("/add_Expenses", addExpencesController.addExpenses);
//addClass
router.get("/addClass", isValid, function (req, res, next) {
  res.render("./class/pages/addClass");
});

//allClass
router.get("/allClass", isValid, async function (req, res, next) {
  const myclass = await addClass.find();
  res.render("./class/pages/allClass", { myclass: myclass });
});
router.post("/class-add", addClassController.addClassPost);
router.post("/class-delete", addClassController.addClassDelete);
//subject
router.get("/subject", isValid, function (req, res, next) {
  res.render("./subject/pages/subject");
});
//classRoutine
router.get("/classRoutine", isValid, async function (req, res, next) {
  const routine = await classRoutine.find();
  res.render("./classRoutine/pages/classRoutine", {
    routine: routine
  });
});
router.post("/classRoutine", isValid, classRoutineController.classRoutine);
//attencence
router.get("/attencence", isValid, function (req, res, next) {
  res.render("./attencence/pages/attencence");
});
//examGrades
router.get("/examGrades", isValid, async function (req, res, next) {
  const gradesList = await gradesData.find({});
  res.render("./exam/pages/examGrades", {
    gradesList: gradesList
  });
});
router.post("/grades-data", isValid, gradesController.gradesPost);
router.post("/grades-delete", gradesController.gradesDelete);
router.post("/grades-update", gradesController.gradesUpdate);



// end grades
// addQuestion
router.get("/addQuestion", function (req, res, next) {
  res.render("./exam/pages/addQuestion");
});

//#region examSchedule
router.get("/examSchedule", isValid, async function (req, res, next) {
  const examList = await exam.find({});
  res.render("./exam/pages/examSchedule", {
    examList: examList
  });
});
router.post("/schedule-data", scheduleController.examScheduleCreate);
router.post("/schedule-delete", scheduleController.scheduleDelete);
router.post("/schedule-update", scheduleController.scheduleUpdate);

//#endregion
//#region transport
router.get("/transport", isValid, async function (req, res, next) {
  // console.log("driverList--->", driverList);
  const driverList = await driver.find({});
  res.render("./transport/pages/transport", {
    driverList: driverList
  });
});
router.post("/transport-data", transportController.transportPost);
router.post("/transport-delete", transportController.transportDelete);
router.post("/transport-update", transportController.transportUpdate);
//#endregion
//hostel
router.get("/hostel", isValid, async function (req, res, next) {
  const hostelList = await hostelData.find({});
  res.render("./hostel/pages/hostel", {
    hostelList: hostelList
  });
});
router.post("/hostel-data", hostelController.hostelPost);
router.post("/hostel-delete", hostelController.hostelDelete);
router.post("/hostel-update", hostelController.hostelUpdate);



// hostel End
//notice
router.get("/notice", isValid, async function (req, res, next) {
  const noticeList = await notice.find({});
  res.render("./notice/pages/notice", {
    title: "notice",
    noticeList: noticeList
  });
});
router.post("/notice-data", noticeController.noticePost);
router.post("/notice-delete", noticeController.noticeDelete);
//#region message
router.get("/message", isValid, function (req, res, next) {
  res.render("./message/pages/message");
});
router.post("/message-data", messageController.messageCreate);
//#endregion
//accountSetting
router.get("/accountSetting", isValid, async function (req, res, next) {
  var token = req.cookies.token;
  var secretOrKey = "mysecret";
  const decoded = await jwt.verify(token, secretOrKey);
  console.log("decoded-->", decoded)
  var id = decoded.data._id;
  const accountSettingList = await user.findOne({ _id: id });
  console.log("accountSettingList--->", accountSettingList);
  res.render("./accountSetting/pages/accountSetting", {
    title: "accountSetting",
    accountSettingList: accountSettingList,
  });
});
router.post("/accountSetting-update", accountSettingController.accountSettingPost);
router.post('/image-upload', upload.single('image-upload'), function (req, res, next) {
  console.log("image--->", image);
});
// router.post("/User_image_upload", upload.single("userImagr"),accountSettingController.userImageUpload);


// AccountSettings
router.get("/AccountSetting", isValid, function (req, res, next) {
  res.render("./admin/pages/AccountSetting");
});
router.get("/addQuestion", function (req, res, next) {
  res.render("./exam/pages/addQuestion");
});
router.post("/question-data", async function (req, res, next) {
  var questionData = req.params.question;
  console.log("questionData---->", questionData);
  // if (questionData) {
  //   questionData = JSON.parse(JSON.stringify(questionData));
  //   var data = {
  //     question: questionData.question,
  //     option: questionData.option,
  //     answer: questionData.answer,
  //   };
  //   console.log("data--->", data);
  // const createDriver = await driver.create(data);
  // if (createDriver) {
  //   res.send({ success: " Data added successfully" });
  // } else {
  //   res.send({ error: "Something went wrong" });
  // }
  // }
});

module.exports = router;
