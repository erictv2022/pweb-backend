const Router = require('koa-router')
const model = require('../models/users')
const can = require('../permission/user-permission')
const auth = require('../controllers/authentication')
const router = Router({prefix: '/api/v1/users'})
const { StatusCode } = require('status-code-enum')
const bodyParser = require("koa-bodyparser");
const { validateUser } = require("../controllers/validation");


router.get('/', auth, getAll)
router.post('/', bodyParser(), validateUser, createUser)

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

async function createUser(ctx) {
  const body = ctx.request.body
  try {
    let result = await model.add(body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (e) {
    ctx.status = 400
  }
}


module.exports = router