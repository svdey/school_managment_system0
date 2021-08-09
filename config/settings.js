const os = require("os");

const hostName = os.hostname();
console.log("Test Server HostName=", hostName);
const appRoot = require("app-root-path").path;

if (hostName === "internal") {
  /// //////////====PRODUCTION SERVER=====//////////////////
  module.exports = {
    HOST: "localhost:3000",
    PORT: 3000,
    defaultPageSize: 20,
    fileUploadAbsolutePath: `${appRoot}/`,
    microServiceLink: {
      linkService: "http://localhost:3000/",
    },
    otpSentToMobileSettings: {
      url: '',
      user: '',
      password: '',
      genkey: '',
      sender: ''
    },
    fileUploadPath: {
      userImage: "public/upload/userImage/",
      videoPath: "public/upload/video/",
      documentUpload: "public/upload/document/",
      BUCKET_NAME: "",
      IAM_USER_KEY: "",
      IAM_USER_SECRET: "",
    },
    mailSettings: {
      user: "*******@gmail.com",
      password: "********",
    },
    masterPassword: "*************",
  };
} else {
  /// //////////====DEVELOPEMENT SERVER===== //////////////////
  module.exports = {
    HOST: "localhost:3000",
    PORT: 3000,
    defaultPageSize: 20,
    fileUploadAbsolutePath: `${appRoot}/`,
    microServiceLink: {
      linkService: "http://localhost:3000/",
    },
    otpSentToMobileSettings: {
      url: '',
      user: '',
      password: '',
      genkey: '',
      sender: ''
    },
    fileUploadPath: {
      userImage: "public/upload/userImage/",
      videoPath: "public/upload/video/",
      documentUpload: "public/upload/document/",
      BUCKET_NAME: "",
      IAM_USER_KEY: "",
      IAM_USER_SECRET: "",
    },
    mailSettings: {
      user: "stswebeloffice@gmail.com",
      password: "stswebel",
    },
    masterPassword: "*************",
  };
}
