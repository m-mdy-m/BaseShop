const router = require('../util/router')
const isAuth = require('../middleware/is-Auth')
const adminControl = require('../controllers/admin')
router.get('/admin',isAuth,adminControl.getAdmin)

module.exports = router