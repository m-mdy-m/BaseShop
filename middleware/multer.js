const multer = require("multer");
const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
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
});
const fileFilter = (req, file, cb) => {
  let png = file.mimeType === "image/png";
  let jpg = file.mimeType === "image/jpg";
  let jpeg = file.mimeType === "image/jpeg";
  if (png || jpeg || jpg) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage: fileStore,
  fileFilter: fileFilter,
}).single("image");
