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
      .custom(async (val, { req }) => {findUser(val)}),
  ],
  authControl.postSignUp
);
module.exports = router;
