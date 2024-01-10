const router = require('../util/router')
const isAuth = require('../middleware/is-Auth')
const adminControl = require('../controllers/admin')
router.get('/admin',isAuth,adminControl.getAdmin)


router.delete('/delete-product/:prodId', isAuth, adminControl.deleteProduct)
router.get('/edit-product/:prodId', isAuth, adminControl.getEdit)
router.put('/edit-product',isAuth,adminControl.EditProduct)
module.exports = router