const render = require("../util/render");
exports.getSignUp = (req, res, nxt) => {
  let msgErr = req.flash("error");
  if (msgErr.length > 0) {
    msgErr = msgErr[0];
  } else {
    msgErr = null;
  }
  render(req, res, "auth/signup", "SIGNUP", msgErr, []);
};
