const passport = require('koa-passport')
const basicAuthentication = require('../strategies/basicauthentication')

passport.use(basicAuthentication)

module.exports = passport.authenticate(['basic'], {session:false})
