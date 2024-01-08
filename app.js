const express = require("express");
const app = express();
const multer = require("multer");
const session = require("express-session");
const connectMongoSession = require("connect-mongodb-session")(session);
const csurf = require("csurf");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");

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
app.set("view engin", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({
    storage: fileStore,
    fileFilter: fileFilter,
  }).single("image")
);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/image",
  express.static(path.join(__dirname, "public", "images"))
);
app.use(flash());
const csrf = csurf();
app(csrf());
const URL = "mongodb://localhost:27017/BaseShop";
const store = new connectMongoSession({
  uri: URL,
  collection: "session",
});
app.use(
  session({
    secret: "hey hey ",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use((req, res, nxt) => {
  res.locals.isAuth = req.session.isLogin;
  res.locals.csrfToken = req.csrfToken();
});

const start = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connect database");
    app.listen(3000, () => {
      console.log("sever run on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
