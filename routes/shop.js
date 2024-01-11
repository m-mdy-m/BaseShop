const router = require("../util/router");
const shopControl = require("../controllers/shop");
const isAuth = require('../middleware/is-Auth')
router.get("/", shopControl.getShop);
router.get('/add-product', isAuth , shopControl.getAddProduct)
router.post('/add-product', isAuth, shopControl.postAddProduct)

router.post('/cart',isAuth,shopControl.postCart)

router.get('/cart',isAuth,shopControl.getCart)
router.delete('/cart/:prodId',isAuth,shopControl.deleteCart )
module.exports = router