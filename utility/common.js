const axios = require("axios");
const request = require("request");
const nodemailer = require("nodemailer");
// configuration
const db = require("../config/db");
const settings = require("../config/settings");
const otpSentToMobileSettings = settings.otpSentToMobileSettings;
const fs = require("fs");

exports.sendSMS = async (userName, mobileNo) => {
  // return new Promise(async function (resolve, reject) {
  if (!userName || userName == "") {
    userName = "";
  }
  //making unique number for OTP
  var digits = 7;
  var numfactor = Math.pow(10, parseInt(digits - 1));
  var randomNum = Math.floor(Math.random() * numfactor) + 1;

  //generate OTP again if start with zero.
  if (randomNum.toString().length < 6) {
    var numfactor = Math.pow(10, parseInt(digits - 1));
    var randomNum = Math.floor(Math.random() * numfactor) + 1;
  }
  try {
    var response = await axios.get(otpSentToMobileSettings.url, {
      params: {
        user: otpSentToMobileSettings.user,
        password: otpSentToMobileSettings.password,
        genkey: otpSentToMobileSettings.genkey,
        sender: otpSentToMobileSettings.sender,
        number: mobileNo,
        message: `Hi ${userName}, your OTP is ${randomNum}`,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
    return { Error: e };
  }
  // });
};
/*random otp genrate*/
exports.genOTP = () => {
  var digits = 7;
  var numfactor = Math.pow(10, parseInt(digits - 1));
  var randomNum = Math.floor(Math.random() * numfactor) + 1;
  return randomNum;
};
exports.getNextNumberFromCode = (prefixLength, code) => {
  let codeNumber = 0;
  let strCodeNumber = code.slice(prefixLength, code.length);
  codeNumber = parseInt(strCodeNumber) + 1;
  return codeNumber;
};
exports.getYearMonthNumber = () => {
  let date = new Date(),
    month = "" + (date.getMonth() + 1),
    year = date.getFullYear().toString().substr(-2);

  if (month.length < 2) month = "0" + month;
  return [year, month].join("");
};
exports.AutoGenerateNumber = function (prefix, id, charlength) {
  charlength = charlength || 10;
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    year = d.getFullYear().toString().substr(-2);
  //,day = '' + d.getDate();

  if (month.length < 2) month = "0" + month;
  //if (day.length < 2) day = '0' + day;

  //var number = [year, month, day].join('');
  let number = [year, month].join("");
  let zero = [];
  if (prefix) {
    number = prefix + number;
  }
  charlength = charlength - number.length;
  for (let i = id.toString().length; i < charlength; i++) {
    zero.push("0");
  }
  if (id) {
    number = [number, zero.join(""), id].join("");
  } else {
    number = [number, zero.join("")].join("");
  }
  return number;
};
//#region nodemailer
// async..await is not allowed in global scope, must use a wrapper
exports.mail = async (email, subject, data) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = await nodemailer.createTransport({
    //
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      //
      user: settings.mailSettings.user,
      pass: settings.mailSettings.password,
    }, //
  });
  var mailOption = {
    from: settings.mailSettings.user,
    to: email,
    subject: subject,
    html: data,
  };
  transporter.sendMail(mailOption, function (error, response) {
    if (error) {
      console.log(error);
      return {
        mailSent: false,
        message: "Email not send",
      };
    } else {
      return {
        mailSent: true,
        message: "Email send",
      };
    }
  });
  // return mailSent;
};
exports.getYearMonthDirectoryNumber = async () => {
  let date = new Date(),
    month = "" + (date.getMonth() + 1),
    year = date.getFullYear().toString();

  if (month.length < 2) month = "0" + month;
  return [year, month];
};
exports.apiCall = async (method, url, data, usedFor = "", userId = "") => {
  if (method === "get") {
    let result;
    if (data) {
      result = await axios.get(url, data);
    } else {
      result = await axios.get(url);
    }
    return result.data.data;
  }
  if (method === "post") {
    // let result = await axios.post(url, { addUserDetails: data });
    // return result.data;

    let result = await axios({
      method: method,
      url: settings.microServiceLink.linkService + "otpSend",
      data: {
        userId: userId,
        info: data.mobile,
        usedFor: usedFor,
      },
    });
    return result.data;
  }
};
exports.sendSMS = async (message, number) => {
  request(
    "http://bhashsms.com/api/sendmsg.php?user=mohendra.agarwal&pass=cashlu&sender=CashLu&phone=" +
      number +
      "&text=" +
      message +
      "&priority=ndnd&stype=normal",
    function (error, response, body) {
      //console.log(body);
    }
  );
};
exports.getInterviewStatus = (interviewStatus) => {
  let status = "";
  switch (interviewStatus) {
    case "S":
      status = "Selected";
      break;
    case "P":
      status = "Pending";
      break;
    case "R":
      status = "Rejected";
      break;
    case "C":
      status = "Cancel";
      break;
    case "D":
      status = "Done";
      break;
    default:
      status = "Pending";
  }
  return status;
};
exports.formatAMPM = async (hours, minutes) => {
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
