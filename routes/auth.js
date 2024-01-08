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

router.get("/signUp", authControl.getSignUp);

router.post(
  "/signUp",
  [
    body("name").isString(),
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom(async (val, { req }) => {
        findUser(val);
      }),
    body("password").isLength({ min: 5 }).trim(),
    body("confirmPassword")
      .trim()
      .custom((val, { req }) => {
        const password = req.body.password;
        console.log("=>", password);
        console.log("=>", val);
        if (val === password) {
          return true;
        }
        throw new Error("THIS NOT MATCH PASSWORD");
      }),
  ],
  authControl.postSignUp
);
module.exports = router;
