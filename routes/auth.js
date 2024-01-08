const router = require("../util/router");
const { body } = require("express-validator");
const authControl = require("../controllers/auth");
const User = require("../models/User");

async function findUser(email) {
  let user = await User.findOne({ email: email });
  if (!user) {
    return Promise.reject("HAS EMAIL");
  }
  return true;
}
function isMatchPassword(req, confirmPassword) {
  const password = req.body.password;
  return password === confirmPassword;
}
router.get("/signUp", authControl.getSignUp);

router.post(
  "/signUp",
  [
    body("name").isString(),
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom(async (val) => {
        findUser(val);
      }),
    body("password").isLength({ min: 5 }).trim(),
    body("confirmPassword")
      .trim()
      .custom((val, { req }) => {
        isMatchPassword(req, val);
      }),
  ],
  authControl.postSignUp
);
module.exports = router;
