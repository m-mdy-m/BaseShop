const router = require("../util/router");
const expValidator = require("express-validator");
const authControl = require("../controllers/auth");
router.get("/signUp", authControl.getSignUp);

module.exports = router;
