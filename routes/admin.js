const router = require('../util/router')
const isAuth = require('../middleware/is-Auth')

router.get('/admin',isAuth,)

module.exports = router