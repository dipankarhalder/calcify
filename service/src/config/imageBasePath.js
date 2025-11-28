
import appRoot from "app-root-path";

const baseUplodFolder = appRoot + '/uploads/';

let prefix = process.env.NODE_ENV == "production" ? "" : process.env.NODE_ENV + "/"

const S3 = {
  endpoint: process.env.S3_HTTP_ENDPOINT,
  paths: {
    profileImage: prefix + "userProfileImage/",
    postMedia: prefix + "postMedia/",
  }
}


export default {
  baseUrl: '/',
  baseUplodFolder,
  paths: {
    profileImage: baseUplodFolder + 'userProfileImage/',
    postMedia: baseUplodFolder + 'postMedia/',
    tmp: baseUplodFolder + 'tmp/',
  },
  S3,
};

