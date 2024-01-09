const router = require("../util/router");
const { body } = require("express-validator");
const authControl = require("../controllers/auth");
const User = require("../models/User");
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
        if (user) {
          throw new Error("HAS EMAIL");
        }
        return true;
      }),
    body("password").isLength({min:5}).trim(),
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

router.get('/login', authControl.getLogin)

router.post('/login',[
  body('name').isString().trim(),
  body('email').isEmail().normalizeEmail().trim(),
  body('password').isLength({min:5}).trim()
],authControl.postLogin)


router.get('/reset', authControl.getReset)

router.post('/reset',authControl.postReset)

router.get('/reset/:token', authControl.getNewPassword)

router.post('/new-password', authControl.postNewPass)
module.exports = router;
