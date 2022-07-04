const Router = require('koa-router')
const model = require('../models/users')
const can = require('../permission/user-permission')
const auth = require('../controllers/authentication')
const router = Router({prefix: '/api/v1/users'})
const { StatusCode } = require("../helpers/error-code");
const bodyParser = require("koa-bodyparser");
const { validateUser } = require("../controllers/validation");


router.get('/', auth, getAll)
router.post('/', bodyParser(), validateUser, createUser)
router.post('/login', bodyParser(), login)

/**
 * Get all users
 * @async
 */
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

/**
 * Create user
 */
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

/**
 * User login
 * @async
 */
async function login(ctx) {
  if(ctx.status.user != null && ctx.status.user !== false) {
    ctx.status.status = StatusCode.SuccessOK
    ctx.status.body = {'user': ctx.status.user, 'status':'ok'}
  }
  else {
    ctx.status.status = StatusCode.ClientErrorForbidden
    ctx.status.body = {'status':'fail'}
  }
}

module.exports = router