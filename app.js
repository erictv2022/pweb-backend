const createError = require('http-errors');
const Koa = require('koa')
const staticRouter = require('koa-static-router')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(bodyParser())

//routes
const home = require('./routes/index')
const petfindings = require('./routes/petfindings')
const user = require('./routes/users')
const dog = require('./routes/dogs')
const message = require('./routes/messages')

app.use(home.routes())
app.use(petfindings.routes())
app.use(user.routes())
app.use(dog.routes())
app.use(message.routes())

// static routes
app.use(staticRouter({dir:'docs', router: '/doc/'}))

// app server state
app.on('error', (err, ctx) => {
    // logger.error('server error', err, ctx)
    console.log(err, ctx)
});

let port = process.env.PORT || 10888;

app.listen(port)

//CORS
app.use(cors({
    origin: function (ctx) {
        const whitelist = ['repl.co']
        // for(let domain in whitelist){
        //     if ((ctx.request.includes(domain))){
        //         return "*";
        //     }
        //     }
        return "*";
        // return `http://localhost:${port}`;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

console.log("API is ready on " + port)
