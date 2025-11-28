import { imageBasePath } from '@/config';
import { authRequired, uploadFiles } from '@/middlewares';
import { deleteFiles, uploadMultipleFileToS3, uploadSingleFileToS3 } from '@/utils';
import express from 'express'
import multer from "multer";
import { sequelize } from "../../db/models";
import userFiles from "./userFiles";

const router = express.Router();

router.use('/userFiles', userFiles);

router.all('/sync', async (req, res, next) => {
  await sequelize.sync({ alter: true });

  return res.json({
    status: 1,
    message: "sync",
  })
});

router.route('/file')
  .post(authRequired())
  .post(async (req, res, next) => {

    let uploader = uploadFiles([{ name: 'file', maxCount: 1 }], imageBasePath.paths.tmp)

    uploader(req, res, async function (err) {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code == 'LIMIT_UNEXPECTED_FILE') {
            return res.json({
              code: 400,
              message: `You are allow to upload max 1 file`,
              data: null
            });
          }
        } else {
          return res.json({
            code: 400,
            message: err.message,
            data: null
          });
        }
      }

      await Promise.all((req.files.file || []).map(async (file) => {
        let uploadRes = await uploadSingleFileToS3(file);

        let fileObj = await sequelize.models.File.build({
          userId: req.auth.id,
          name: req.body.name || "",
          path: uploadRes.key
        });

        await fileObj.save();

        deleteFiles(file.path);

        return res.json({
          code: 200,
          message: "File uploaded",
          data: fileObj.exposeData(),
        })

      }));

    });
  });

router.route('/file/:id')
  .get(async (req, res, next) => {
    try {
      let file = await sequelize.models.File.findByPk(req.params.id);

      return res.redirect(file.redirectUrl());
    } catch (error) {
      return res.sendStatus(404);
    }
  });


export default router;
