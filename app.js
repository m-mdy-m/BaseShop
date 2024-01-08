const express = require("express");
const app = express();
const csurf = require("csurf");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const session = require("./middleware/session")
const locals = require("./middleware/setLocals")
const multer = require("./middleware/multer");
const user = require('./middleware/findUser')
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer);
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/image",express.static(path.join(__dirname, "public", "images")));
app.use(session);
app.use(flash());
const csrfProtection = csurf();
app.use(csrfProtection);
app.use(locals);
app.use(user)

const authRouter = require('./routes/auth')

app.use(authRouter)
const URL = "mongodb://localhost:27017/BaseShop";
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
