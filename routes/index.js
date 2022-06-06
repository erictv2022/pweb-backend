const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const auth = require('../controllers/authentication')

const router = Router({prefix: '/api/v1'})
router.get('/', publicAPI);
router.get('/admin', auth, privateAPI);

/**
 * Public entry point of api
 */
function publicAPI(ctx) {
  ctx.body = {message: 'PUBLIC PAGE: You requested a new message URI (root) of the API'}
}

function privateAPI(ctx) {
  const user = ctx.state.user;
  ctx.body = {message: `Hello ${user.username} you registered on ${user.dateRegistered}`}
}

module.exports = router
