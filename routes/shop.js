const router = require("../util/router");
const shopControl = require("../controllers/shop");
router.get("/", shopControl.getShop);
module.exports = router