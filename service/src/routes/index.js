import fs from "fs";
import path from "path";
import { logger } from '../utils'

const basename = path.basename(__filename);

let init = app => {

  // add logger to every request
  app.use('*', (req, res, next) => {
    logger.log("METHOD :", req.method)
    logger.log("URL :", req.originalUrl)
    logger.log("BODY :", JSON.stringify(req.body, null, 2))
    // logger.log("HEADERS :", JSON.stringify(req.headers, null, 2))
    next();
  })

  fs
    .readdirSync(__dirname, { withFileTypes: true })
    .filter(file => {
      return file.isDirectory();
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(dir => {
      app.use(`/${dir.name}`, require(path.join(__dirname, dir.name)).default)
    });

  // on invalid router
  app.use('*', (req, res, next) => {
    res.send("invalid router");
  })

  // expressjs error handeler
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      console.log("error handeler");
      console.error(err.stack)
      res.status(500).send({
        status: 1,
        message: 'Something broke!'
      })
    })
  }

  //   logger.log("app.get('env')", app.get('env'))
  //   app.use(function (err, req, res, next) {
  //     logger.error("err", err)
  //     res.status(err.status || 500);
  //     res.json({
  //       message: err.message,
  //       error: err
  //     });
  //   });

  // production error handler
  // no stacktraces leaked to user
  // app.use(function (err, req, res, next) {
  //   res.status(err.status || 500);
  //   res.render('error', {
  //     message: err.message,
  //     error: {}
  //   });
  // });
}

export default {
  init
}
