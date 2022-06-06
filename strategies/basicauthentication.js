const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users')

const verifyPassword = function (user, password) {
  // check user password input
  return user.password === password
}

const checkUserAndPassword = async (username, password, done) => {
  // find user and check against the password record
  // call done() with either an error or the user, depending on outcome
  let authResult

  try {
    authResult = await users.findByUsername(username)
  } catch (error) {
    console.error(`Authentication error for user ${username}`)
    return done(error);
  }

  try {
    if (authResult.length) {
      const user = authResult[0]
      if (verifyPassword(user, password)) {
        console.log(`Successfully authenticated user ${username}`)
        return done(null, user);
      } else {
        console.log(`Password incorrect for user ${username}`)
        return done(null, false)
      }
    } else {
      console.log(`Non exist username ${username}`)
      return done(null, false)
    }
  } catch (e) {
    return done(null, false) // password incorrect
  }
}

const strategy = new BasicStrategy(checkUserAndPassword)

module.exports = strategy
