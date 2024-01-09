const router = require("../util/router");
const shopControl = require("../controllers/shop");
const isAuth = require('../middleware/is-Auth')
router.get("/", shopControl.getShop);
router.get('/add-product', isAuth , shopControl.getAddProduct)
router.post('/add-product', isAuth, shopControl.postAddProduct)
module.exports = router