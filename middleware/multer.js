const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('hi');
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const formatDate = `${year}-${month}-${day}`;
    const formatFil = `${formatDate}-${file.originalname}`;
    cb(null, formatFil);
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
let configMulter = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");
module.exports = configMulter
