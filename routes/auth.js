const router = require("../util/router");
const { body } = require("express-validator");
const authControl = require("../controllers/auth");
const User = require("../models/User");

async function findUser(email) {
  const user = await User.findOne({ email: email });
  if (user) {
    return true;
  } else {
    throw new Error("HAS EMAiL");
  }
}
function isMatchPassword(req, confirmPassword) {
  if (confirmPassword === req.body.password) {
    return true;
  } else {
    throw new Error("NOT MATCH PASSWORD");
  }
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
        const user = await User.findOne({ email: val });
        if (!user) {
          throw new Error("HAS EMAiL");
        }
        return true;
      }),
    body("password").isLength({ min: 5 }).trim(),
    body("confirmPassword")
      .custom((val, { req }) => {
        if (val !== req.body.password) {
          throw new Error("NOT MATCH PASSWORD");
        }
        return true;
      })
      .trim(),
  ],
  authControl.postSignUp
);

router.delete("/logout", authControl.logOut);
module.exports = router;
