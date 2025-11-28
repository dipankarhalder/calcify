import multer from "multer";
import { v1 as uuidV1 } from "uuid";
import path from "path";

export const uploadFiles = (fields, destination, mimeTypes = [], fieldSize = '100MB') => {
    return multer({
        storage: multer.diskStorage({
            destination: destination, //global.constant.uploads.landingAdPicture,
            filename: function (req, file, cb) {
                cb(null, uuidV1() + path.extname(file.originalname));
            }
        }),
        limits: {
            //fileSize: maxSize,
            fieldSize: fieldSize,
        },
        fileFilter: (req, file, cb) => {
            cb(null, true);
            // console.log("File: ", file)
            // console.log("mimeTypes.includes(file.mimetype): ", mimeTypes.includes(file.mimetype))
            // console.log("mimeTypes: ", mimeTypes)
            // console.log("mimeTypes.length: ", mimeTypes.length === 0)
            // if (mimeTypes.includes(file.mimetype) || mimeTypes.length === 0) {
            //     cb(null, true);
            // } else {
            //     //console.log("fileFilter false file", file);
            //     // cb(null, false);
            //     cb(new Error('Wrong File Type'))
            // }
            // The function should call `cb` with a boolean 
            // to indicate if the file should be accepted 

            // To reject this file pass `false`, like so: 
            //cb(null, false)

            // To accept the file pass `true`, like so: 
            //cb(null, true)

            // You can always pass an error if something goes wrong: 
            //cb(new Error('I don\'t have a clue!'))

        }
    }).fields(fields);
};
