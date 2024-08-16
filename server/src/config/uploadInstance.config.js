// multer config for handling profile pic instance
import multer from "multer"
import path from "path"

// create multer
const storage= multer.memoryStorage()

const uploadBufferPicInstance = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png/
        return fileValidatorHelper(file, cb, allowedTypes)
    },
    limits: {
        files: 1,
        fileSize: 1 * 1024 * 1024 //1mb,
    }
}).single('profilePic')


function fileValidatorHelper(file, cb, regex) {
    const checkFileType = regex.test(path.extname(file.originalname))
    const checkMimeType = regex.test(file.mimetype)
    if (checkFileType && checkMimeType) cb(null, file)
    else cb(new Error('File format is invalid, try using images!'))
}


export {
    uploadBufferPicInstance
}