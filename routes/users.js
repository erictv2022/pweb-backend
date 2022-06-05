const Router = require('koa-router')
const model = require('../models/users')
const can = require('../permission/user-permission')
const auth = require('../controllers/authentication')
const router = Router({prefix: '/api/v1/users'})
const { StatusCode } = require('status-code-enum')


router.get('/', auth, getAll)

async function getAll(ctx) {
  try {
    const permission = can.readAll(ctx.state.user)
    if (!permission.granted) {
      ctx.status = StatusCode.ClientErrorForbidden;
    } else {
      const result = await model.getAll()
      if (result.length) {
        ctx.body = result;
      }
    }
  } catch (e) {
    ctx.status = StatusCode.ClientErrorBadRequest
  }
}

module.exports = router