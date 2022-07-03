const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/message')
const StatusCode = require("../helpers/error-code");
const db = require("../helpers/database");

const router = Router({prefix: '/api/v1/messages'})
router.get('/finding/:findingId([0-9]{1,})', getMessagesByFindingId)
router.post('/finding/:findingId([0-9]{1,})', bodyParser, createMessage)

/**
 * Get all the messages related to the same pet finding record
 * @async
 */
async function getMessagesByFindingId(ctx) {
    // const findAll = model.Message.findAll({ where: { findingId: [ctx.request.findingId] } }).then(messages => {
    //     ctx.status = StatusCode.SuccessOK
    //     ctx.body = messages
    // })

    ctx.status = 200
    ctx.body = [{
        "id": 1,
        "firstname": "eric",
        "lastname": "yu",
        "finding_id": 1,
        "email": "eric@example.com",
    }]
}

/**
 * Create a message for the pet finding record
 * @async
 */
async function createMessage(ctx){
    try {
        const messages = ctx.request.body
        const firstname = ctx.request.body['firstname'] || ""
        const lastname = ctx.request.body['lastname'] || ""
        const message = ctx.request.body['message'] || ""
        const findingId = ctx.request.body['finding_id'] || ""
        const email = ctx.request.body['email'] || ""

        let keys = Object.keys(messages)
        let values = Object.values(messages)
        keys = keys.join(',')
        let parm = ''
        for(i=0; i<values.length; i++){ parm +='?,'}
        parm=parm.slice(0,-1)
        let query = `INSERT INTO messages (${keys}) VALUES (${parm})`
        try{
            await db.run_update(query, values)
            return {"status": 201}
        } catch(error) {
            return error
        }


        // const messagePromise = await model.createMessage(firstname, lastname, message, findingId, email)
        // messagePromise.then(message => {
        //     ctx.status = StatusCode.SuccessCreated
        //     ctx.body = message.toJSON()
        // })
    } catch (e) {
        ctx.status = StatusCode.ClientErrorBadRequest
        ctx.error = e.message
    }
}

module.exports = router