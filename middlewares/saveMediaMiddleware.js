import multer from "multer";
import {extname} from "path";

const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: 'media',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + extname(file.originalname))
    }
});

 export const saveMediaMiddleware = multer({
    storage: imageStorage,
    limits: {
        fileSize: 5000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

