const multer = require('multer');
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if(!file.mimetype.includes("image")) {
        return cb('Invalid image format!', false);
    }
    cb(null, true);
};
const upload_image = multer({ storage, fileFilter }).single("image");
module.exports = upload_image;