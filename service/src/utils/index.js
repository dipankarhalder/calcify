import _ from "lodash";
require('deepdash')(_);

export * as logger from "console";
import * as jwt from 'jsonwebtoken';
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import crypto from 'crypto';
import * as consolidate from 'consolidate'

import * as admin from "firebase-admin";

import AWS from "aws-sdk";
import * as mime from "mime-types";
import { v1 as uuidV1 } from "uuid";

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import MailComposer from "nodemailer/lib/mail-composer";
import { ImapFlow } from "imapflow";

import firebaseConfig from '@/config/serviceAccountKey.json'

export * as token from './token'

const moment = extendMoment(Moment);

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_KEY,
  secretAccessKey: process.env.S3_BUCKET_SECRET
});

export let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM TO LOGIN PAGE
  // req.session.redirectTo = req.originalUrl;
  res.redirect('/login');
}

export let isGuest = (req, res, next) => {
  if (!req.isAuthenticated())
    return next();

  // IF A USER LOGGED IN, THEN REDIRECT THEM TO DASHBOARD PAGE
  // req.session.redirectTo = req.originalUrl;
  res.redirect('/dashboard');
}

export let buildMenuHtml = (menu_array, currentUrl, is_sub = false) => {

  let menu = '';

  if (is_sub) {

    let parentActiveClass = '';

    let parentFound = _.findDeep(menu_array || [], menu => menu.url === currentUrl, {
      childrenPath: "children"
    });

    if (parentFound) {
      parentActiveClass = 'menu-open'
    }


    menu += `<ul class="nav nav-treeview ${parentActiveClass}">`

    menu_array.forEach(m => {

      let activeClass = '';
      let childActiveClass = '';

      if (currentUrl == m.url) {
        activeClass = 'active';
      } else {
        let found = _.findDeep(m.children || [], menu => menu.url === currentUrl, {
          childrenPath: "children"
        });

        if (found) {
          activeClass = 'active';
          childActiveClass = 'menu-open'
        }
      }

      menu += `<li class="nav-item ${childActiveClass}">`
        + `<a href="${m.url || '#'}" class="nav-link ${activeClass}">`
        + `<i class="far ${m.leftIconClass} nav-icon"></i>`
        + `<p>`
        + `${m.title}`

      if (m.children && m.rightIconClass)
        menu += `<i class="right fas ${m.rightIconClass}"></i>`

      if (m.badgeContent)
        menu += + `<span class="right badge ${m.badgeClass}">${m.badgeContent}</span>`

      menu += `</p>`
        + `</a>`

      if (m.children) {
        menu += buildMenu(m.children, currentUrl, true);
      }

      menu += `</li>`

    });

    menu += `</ul>`
  } else {

    menu_array.forEach(m => {

      if (typeof m == 'object') {
        let activeClass = '';
        let childActiveClass = '';

        if (currentUrl == m.url) {
          activeClass = 'active';
        } else {
          let found = _.findDeep(m.children || [], menu => menu.url === currentUrl, {
            childrenPath: "children"
          });

          if (found) {
            activeClass = 'active';
            childActiveClass = 'menu-open'
          }
        }

        menu += `<li class="nav-item ${childActiveClass}">`
          + `<a href="${m.url || '#'}" class="nav-link ${activeClass}">`
          + `<i class="nav-icon fas ${m.leftIconClass}"></i>`
          + `<p>`
          + `${m.title}`

        if (m.children && m.rightIconClass)
          menu += `<i class="right fas ${m.rightIconClass}"></i>`

        if (m.badgeContent)
          menu += `<span class="right badge ${m.badgeClass}">${m.badgeContent}</span>`

        menu += `</p>`
          + `</a>`

        if (m.children) {
          menu += buildMenu(m.children, currentUrl, true);
        }

        menu += `</li>`
      } else if (typeof m == 'string') {
        menu += `<li class="nav-header">${m}</li>`
      }

    });
  }

  return menu;

}

export let buildMenu = app => (menu_array, currentUrl, is_sub = false) => {

  // console.log("menuReplacer", app.locals.menuReplacer);

  let menu_array_str = JSON.stringify(menu_array);

  for (const key in app.locals.menuReplacer) {
    menu_array_str = menu_array_str.replaceAll(`[${key}]`, app.locals.menuReplacer[key]);
  }

  menu_array = JSON.parse(menu_array_str);

  return buildMenuHtml(menu_array, currentUrl, is_sub = false);
};

export let assignMenuVariables = (req, key, val) => {
  req.app.locals.menuReplacer = req.app.locals.menuReplacer || {};

  req.app.locals.menuReplacer[key] = val;
};

export const randomNumber = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low)
}

export const xDigitRandomNumber = (x = 6) => {
  let lowerXDigitNumber = Number(1 + "0".repeat(x - 1))
    , upperXDigitNumber = Number("9".repeat(x));

  return randomNumber(lowerXDigitNumber, upperXDigitNumber);
}

export const randomString = (howMany, chars) => {
  chars = chars
    || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
  var rnd = crypto.randomBytes(howMany)
    , value = new Array(howMany)
    , len = len = Math.min(256, chars.length)
    , d = 256 / len

  for (var i = 0; i < howMany; i++) {
    value[i] = chars[Math.floor(rnd[i] / d)]
  };

  return value.join('');
}

export const generateToken = (obj = {}, expiresIn = "100 days") => {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn,
  })
}

export const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      let newError = new Error("TOKEN_EXPIRED");
      newError.name = "TOKEN_EXPIRED";
      throw newError;
    } else {
      let newError = new Error("INVALID_TOKEN");
      newError.name = "INVALID_TOKEN";
      throw newError;
    }
  }
}

export const sendMail = async ({ to, subject, htmlBody = "", textBody = "" }) => {
  try {

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: process.env.SMTP_USERNAME,
    //     clientId: process.env.SMTP_CLIENT_ID,
    //     clientSecret: process.env.SMTP_CLIENT_SECRET,
    //     refreshToken: process.env.SMTP_REFRESH_TOKEN,
    //     accessToken: process.env.SMTP_ACCESS_TOKEN,
    //   }
    // });

    // transporter.on('token', token => {
    //   console.log('A new access token was generated');
    //   console.log('User: %s', token.user);
    //   console.log('Access Token: %s', token.accessToken);
    //   console.log('Expires: %s', new Date(token.expires));
    //   process.env.SMTP_ACCESS_TOKEN = token.accessToken;
    // });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    var mail = new MailComposer({
      from: `"Calcify" ${process.env.SMTP_USERNAME}`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: textBody, // plain text body
      html: htmlBody, // html body
    }).compile();

    mail.keepBcc = true;
    mail.build(async (err, message) => {
      // process.stdout.write(message);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        envelope: {
          from: `"Calcify" ${process.env.SMTP_USERNAME}`, // sender address
          to
        },
        raw: message
      });

      console.log("Message sent:", info);
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // info.message.pipe(process.stdout);
      try {

        const client = new ImapFlow({
          host: process.env.IMAP_HOST,
          port: process.env.IMAP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
          },
          logger: false
        });

        await client.connect();
        let res = await client.append('Sent', message, ['\\Seen']);
        console.log("AppendResponseObject", res);

        client.close();
      } catch (error) {
        console.log("ImapFlow", error);
      }
    });

  } catch (error) {
    console.log("sendMail error", error);
  }

  console.log("sendMail Done");

  return;
}

export const sendMailWithAttachment = async (to, subject, htmlBody = "", textBody = "", attachment_filename = "", attachment_filepath = "", attachment_filetype = "") => {
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Admisure" ${process.env.SMTP_USERNAME}`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: textBody, // plain text body
      html: htmlBody, // html body
      attachments: [{
        filename: attachment_filename,
        content: fs.createReadStream(attachment_filepath),
        contentType: attachment_filetype
      }]
    });

    console.log("Message sent:", info);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  } catch (error) {
    console.log("sendMail error", error);
  }

  console.log("sendMail Done");

  return;
}

export const getFileContent = filePath => {
  return fs.readFileSync(filePath, 'utf8');
}

export const getEmailContent = async (templateName, data) => {
  let content = await consolidate.ejs(path.join(__dirname, `/../emailTemplates/${templateName}.ejs`), data)

  return content;
}

export const getPurchaseInvoiceContent = async (templateName, data) => {
  let content = await consolidate.ejs(path.join(__dirname, `/../pdf/${templateName}.ejs`), data)
  return content;
}

export const deleteFiles = async (files, callback) => {
  var files = Array.isArray(files) ? files : [files];
  var i = files.length;
  files.forEach(function (filepath) {
    console.log("deleteFiles : " + filepath);
    if (filepath != null || filepath != '') {
      try {
        fs.unlink(filepath, function (err) {
          i--;
          if (err) {
            throw err;
          } else if (i <= 0) {
            return
          }
        });
      } catch (error) {
        return
      }
    }
  });
}

export const paginate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

export const stringMask = (str = "", displayFirstChrs = 2, displayLastChrs = 2, maskBy = "*") => {
  str = "" + str;
  let maskedName = str.substring(0, displayFirstChrs) + maskBy.repeat(str.length - (displayFirstChrs + displayLastChrs)) + str.slice(-displayLastChrs);
  return maskedName;
};

export let genOtp = () => {
  let otp = "123456"

  if (!process.env.isTestMode) {
    otp = xDigitRandomNumber(6);
  }

  return otp;
};

export const sendFcmPushNotification = async (data = {}, registrationTokens = []) => {
  console.log("sendFcmPushNotification data", data);
  console.log("sendFcmPushNotification registrationTokens", registrationTokens);

  if (registrationTokens.length == 0) {
    return
  }

  const message = {
    notification: {
      title: data.title,
      body: data.description
    },
    data,
    tokens: registrationTokens,
  };

  let response = await firebaseApp.messaging().sendMulticast(message);

  console.log("sendFcmPushNotification response", response);

  return response;

};

export const uploadFileToS3 = async ({ key, filePath, ACL = "public-read" }) => {

  const contentType = mime.lookup(filePath);

  const buffer = fs.readFileSync(filePath);

  let params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ACL,
    ContentType: contentType
  };

  let s3Response = await s3.putObject(params).promise();
  s3Response.Url = process.env.S3_HTTP_ENDPOINT + key;

  return s3Response;
}

export const deleteS3Objects = async (objectNames = []) => {
  if (!objectNames.length) {
    return;
  }

  console.log("objectNames", objectNames);

  var deleteParam = {
    Bucket: process.env.S3_BUCKET_NAME,
    Delete: {
      Objects: [
        { Key: 'a.txt' },
        { Key: 'b.txt' },
        { Key: 'c.txt' }
      ]
    }
  };

  deleteParam.Delete.Objects = objectNames.map(o => ({ Key: o }))
  //this.logger.log(JSON.stringify(deleteParam, null, 2))

  return await s3.deleteObjects(deleteParam).promise()
}

export const romanize = (num) => {
  var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 },
    roman = '',
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

export const uploadSingleFileToS3 = async (file = { path: null }) => {
  var fileStream = fs.createReadStream(file.path);
  const contentType = mime.lookup(file.path);

  var uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    ACL: "public-read",
    Key: uuidV1(),
    ContentType: contentType,
    Body: fileStream
  };

  let response = await s3.upload(uploadParams).promise();

  return {
    key: uploadParams.Key,
    url: process.env.S3_HTTP_ENDPOINT + uploadParams.Key,
    response,
  };
}

export const uploadMultipleFileToS3 = async (files) => {
  return await Promise.all((files || []).map(async (file) => {
    return await uploadSingleFileToS3(file);
  }));
}

export const splitToSlots = (start, end) => {
  const range = moment.range(start, end);

  const slots = Array.from(range.by('minutes', { step: 30 }));

  let result = [];

  for (let i = 0; i < slots.length - 1; i++) {
    result.push({
      from: slots[i],
      to: slots[i + 1],
      name: slots[i].format("HH:mm") + ' - ' + slots[i + 1].format("HH:mm")
    })
  }

  return result;
};