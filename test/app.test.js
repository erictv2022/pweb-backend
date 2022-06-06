const Koa = require('koa')
const app = new Koa();

//routes
const home = require('../routes/index')
const petfindings = require('../routes/petfindings')
const user = require('../routes/users')
const dog = require('../routes/dogs')
const message = require('../routes/messages')

app.use(home.routes())
app.use(petfindings.routes())
app.use(user.routes())
app.use(dog.routes())
app.use(message.routes())

module.exports = app