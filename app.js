const createError = require('http-errors');
const Koa = require('koa')
const static = require('koa-static-router')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = new Koa();

//routes
const petfindings = require('./routes/petfindings')
app.use(petfindings.routes())

const user = require('./routes/users')
app.use(user.routes())

const dog = require('./routes/dogs')
app.use(dog.routes())

// static routes
app.use(static({dir:'docs', router: '/doc/'}))

// app server state
app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx)
});

let port = process.env.PORT || 10888;

app.listen(port)
console.log('API is ready')
