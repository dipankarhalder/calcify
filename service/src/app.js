import * as createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { sequelize } from "./db/models";
import cors from "cors";
// import { faker } from '@faker-js/faker';
import route from './routes';
import { v1 as uuidV1 } from "uuid";

import { imageBasePath } from "./config";

import './cron'

const app = express();


app.use(cors({ origin: "*", }))
  .use(logger(':method :url :status :response-time ms - :res[content-length] - :total-time ms'))
  .use(express.json({ limit: "10MB" }))
  .use(express.urlencoded({ extended: true, limit: "10MB" }))
  .use(cookieParser())

app.disable('x-powered-by')

app.use(express.static(imageBasePath.baseUplodFolder));

// for (const key in imageBasePath.paths) {
//   app.use(express.static(imageBasePath.paths[key]));
// }

app.use((req, res, next) => {
  imageBasePath.baseUrl = req.protocol + '://' + req.get('host') + "/";
  res.setHeader('request-id', uuidV1())
  next();
});

function logResponseBody(req, res, next) {
  const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
  }

  console.log(`${req.method} ${req.originalUrl} [STARTED]`)
  const start = process.hrtime()

  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start)
    console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
  })

  res.on('close', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start)
    console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
  })


  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk, encoding) {
    chunks.push(Buffer.from(chunk, encoding));

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk, encoding) {
    if (chunk) {
      chunks.push(Buffer.from(chunk, encoding));
    }

    var body = Buffer.concat(chunks).toString('utf8');

    // console.log(req.path, body);
    oldEnd.apply(res, arguments);

    process.nextTick(function () {

      // console.log("res.get('Content-Type')", res.get('Content-Type'));

      // console.log("res.getHeaders()", res.getHeaders());
      // console.log("res._headers >>>>>>>", res._headers);

      let isJson = /application\/json/.test(res.get('Content-Type'));

      let ignoreFields = ['otp']

      body = isJson && JSON.stringify(JSON.parse(body), (key, value) => {
        if (ignoreFields.includes(key.toLowerCase())) {
          return (value || '').replace(/./gi, '*');
        }
        return value;
      })

      // console.log({
      //   time: new Date().toUTCString(),
      //   fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      //   method: req.method,
      //   originalUri: req.originalUrl,
      //   uri: req.url,
      //   requestData: req.body,
      //   responseData: isJson && JSON.parse(body) || body,
      //   referer: req.headers.referer || '',
      //   ua: req.headers['user-agent']
      // });
    });


  };

  next();
}

// app.use(logResponseBody);


route.init(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    // await sequelize.sync();
    // await sequelize.models.Transaction.sync({ alter: true });
    console.log('Connection has been established successfully.');

    const settingSeeder = async () => {

      const settings = [
        { label: "Refer earn percent", key: "refer_earn_percent", value: 1 },
      ]

      for (const { key, ...restSetting } of settings) {
        await sequelize.models.Setting.findOrCreate({
          where: {
            key,
          },
          defaults: restSetting
        });
      }

    };

    // await settingSeeder();

    // run sync database schema 
    setTimeout(async () => {
      await sequelize.sync({ alter: true });
    }, 5000);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default app;
