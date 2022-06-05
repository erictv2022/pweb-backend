const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const request = require('request')
const model = require("../models/petfindings");
const StatusCode = require("status-code-enum");
const router = Router({prefix: '/api/v1/dogs'})

/**
 * GET dog breeds.
 */
router.get('/', getAll)

/**
 * Get all dogs breed from Dogs API.
 * @async
 * @param ctx - request context
 * @param next - next handler
 */
async function getAll(ctx, next) {
    const fetchDogBreeds = (url) => new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) reject(new Error('invalid API call'))
            resolve(body)
        })
    })

    try {
        fetchDogBreeds('https://dog.ceo/api/breeds/list/all').then(data => {
            ctx.status = StatusCode.SuccessOK
            ctx.body = {'data': data, 'status': 'ok'}}
        )
    } catch (e) {
        ctx.status = StatusCode.ClientErrorBadRequest
    }
}

module.exports = router;