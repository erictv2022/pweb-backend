const createError = require('http-errors');
const Koa = require('koa')
const static = require('koa-static-router')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = new Koa();

// view engine setup
// app.use(logger('dev'));
// app.use(cookieParser());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//routes
const petfindings = require('./routes/petfindings')
app.use(petfindings.routes())

// static routes
app.use(static({dir:'docs', router: '/doc/'}))

// app server state
app.on('error', (err, ctx) => {
    log.error('server error', err, ctx)
});

module.exports = app;
