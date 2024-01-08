const render = require("../util/render");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
exports.getSignUp = (req, res, nxt) => {
  const msgErr = req.flash("ERROR");
  render(req, res, "auth/signup", "SIGNUP", msgErr, [], {
    oldValue: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};
exports.postSignUp = async (req, res, nxt) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const err = validationResult(req);
  console.log('hi');
  if (!err.isEmpty()) {
    let errors = err.array();
    return render(
      req,
      res,
      "auth/signUp",
      "SIGNUP",
      err.array(),
      errors,
      {
        oldValue: {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
      }
    );
  }
  console.log('hi2');
  const hashedPassword = await bcryptjs.hash(password, 12);
  console.log('pass',hashedPassword);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    cart: [],
  });
  console.log("user =>", user);
  await user.save();
  console.log("user created ");
  req.session.isLogin = true;
  req.session.user = user;
  req.session.save();
  res.redirect("/");
};
