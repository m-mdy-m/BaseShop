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
app.set("view engin", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
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
start()