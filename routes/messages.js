const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/message')
const StatusCode = require("../helpers/error-code");

const router = Router({prefix: '/api/v1/messages'})
router.get('/finding/:findingId([0-9]{1,})', getMessagesByFindingId)
router.post('/finding/:findingId([0-9]{1,})', bodyParser, createMessage)

async function getMessagesByFindingId(ctx) {
    let id = ctx.params.id
    let petFinding = await model.getById(id)
    if (petFinding.length) {
        ctx.body = petFinding[0]
    }
}

async function createMessage(ctx){
    try {
        const firstname = ctx.request.body['firstname'] || ""
        const lastname = ctx.request.body['lastname'] || ""
        const message = ctx.request.body['message'] || ""
        const findingId = ctx.request.body['findingId'] || ""

        const messagePromise = await model.createMessage(firstname, lastname, message, findingId)
        messagePromise.then(message => {
            ctx.status = StatusCode.SuccessCreated
            ctx.body = message.toJSON()
        })
    } catch (e) {
        ctx.status = StatusCode.ClientErrorBadRequest
    }
}
