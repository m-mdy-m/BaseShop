const render = require("../util/render");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../util/sendEmail");
exports.getSignUp = (req, res, nxt) => {
  render(req, res, "auth/signup", "SIGNUP");
};
exports.postSignUp = async (req, res, nxt) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    let errors = err.array();
    console.log(errors);
    return render(req, res, "auth/signUp", "SIGNUP", err.array(), errors, {
      oldValue: {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    });
  }
  const hashedPassword = await bcryptjs.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    cart: [],
  });
  await user.save();
  console.log("user created ");
  req.session.isLogin = true;
  req.session.user = user;
  req.session.save();
  res.redirect("/");
};
exports.logOut = async (req, res, nxt) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
};
exports.getLogin = async (req, res, nxt) => {
  render(req, res, "auth/login", "LOGIN");
};
exports.postLogin = async (req, res, nxt) => {
  const body = req.body;
  const name = body.name;
  const email = body.email;
  const password = body.password;
  console.log("name =>", name);
  console.log("email =>", email);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    let Errors = err.array();
    return render(req, res, "auth/login", "LOGIN", err.array()[0].msg, Errors, {
      oldValue: {
        name,
        email,
        password,
      },
    });
  }
  let user = await User.findOne({ email: email });
  console.log("user =>", user);
  if (!user) {
    let Errors = err.array();
    return render(
      req,
      res,
      "auth/login",
      "LOGIN",
      "EMAIL IS NOT IN DATABASE",
      [],
      {
        oldValue: {
          name: name,
          email: email,
          password: password,
        },
      }
    );
  }
  const matchPassword = await bcryptjs.compare(password, user.password);
  if (!matchPassword) {
    return render(
      req,
      res,
      "auth/login",
      "LOGIN",
      "PASSWORD IS NOT MATCH",
      [],
      {
        oldValue: {
          name: name,
          email: email,
          password: password,
        },
      }
    );
  }
  req.session.user = user;
  req.session.isLogin = true;
  await req.session.save();
  res.redirect("/");
};
exports.getReset = (req, res) => {
  render(req, res, "auth/reset", "RESET");
};
exports.postReset = async (req, res, nxt) => {
  const email = req.body.email;
  crypto.randomBytes(12, async (err, buff) => {
    if (err) {
      return res.redirect("/");
    }
    const token = buff.toString("hex");
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.redirect("/signUp");
    }
    const date = new Date();
    console.log("base date", date);
    await date.setMinutes(date.getMinutes() + 10);
    user.Token = token;
    user.dateToken = date;
    console.log("dateToken old", user.dateToken);
    await user.save();
    await sendEmail(email, token);
    res.redirect("/");
  });
};
exports.getNewPassword = async (req, res, nxt) => {
  const token = req.params.token;
  let date = new Date();
  const user = await User.findOne({
    Token: token,
  });
  if (date > user.dateToken) {
    return res.redirect("/");
  }
  if (!user) {
    return res.redirect("/");
  }
  const msgErr = req.flash("Err");
  render(req, res, "auth/new-password", "RESET NEW PASSWORD", msgErr, [], {
    oldValue: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    userId: user._id,
    token: token,
  });
};
exports.postNewPass = async (req, res) => {
  const token = req.body.token;
  const userId = req.body.userId;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    let errors = err.array();
    return render(
      req,
      res,
      "auth/new-password",
      "new password",
      err.array()[0].msg,
      errors,
      {
        oldValue: {
          password: password,
          confirmPassword: confirmPassword,
        },
      }
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    return render(
      req,
      res,
      "auth/new-password",
      "new password",
      "USER NOT FOUND",
      [],
      {
        oldValue: {
          password: password,
          confirmPassword: confirmPassword,
        },
      }
    );
  }
  const hashedPass = await bcryptjs.hash(password , 12)
  user.password = hashedPass
  user.Token = undefined
  user.dateToken = undefined
  await user.save()
  return res.redirect('/login')
};
