const router = require("../util/router");
const expValidator = require("express-validator");
const authControl = require("../controllers/auth");
router.get("/signUp", authControl.getSignUp);


router.post('/signUp', authControl.postSignUp)
module.exports = router;
