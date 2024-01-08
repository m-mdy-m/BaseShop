const router = require("../util/router");
const { body } = require("express-validator");
const authControl = require("../controllers/auth");
const User = require("../models/User");

async function findUser(email) {
  return await User.findOne({ email: email });
}
function isMatchPassword(req, confirmPassword) {
  if (confirmPassword !== req.body.password) {
    throw new Error("NOT MATCH PASSWORD");
  }
  return true;
}
router.get("/signup", authControl.getSignUp);

router.post(
  "/signup",
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
      .custom((val, { req }) => {
        isMatchPassword(req, val);
      })
      .trim(),
  ],
  authControl.postSignUp
);
module.exports = router;
