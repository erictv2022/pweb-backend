const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/message')
const StatusCode = require("../helpers/error-code");
const db = require("../helpers/database");

const router = Router({prefix: '/api/v1/messages'})
router.get('/finding/:findingId([0-9]{1,})', getMessagesByFindingId)
router.post('/finding/:findingId([0-9]{1,})', createMessage)
router.delete('/:messageId([0-9]{1,})', deleteMessage)

/**
 * Get all the messages related to the same pet finding record
 * @async
 */
async function getMessagesByFindingId(ctx) {
    try {
        let data = await getDBMessageByFindingId(ctx.params.findingId)
        ctx.status = 200
        ctx.body = data
    } catch (error) {
        ctx.status = 404
    }
}

/**
 * Create a message for the pet finding record
 * @async
 */
async function createMessage(ctx) {
    try {
        const messages = ctx.request.body
        let keys = Object.keys(messages)
        let values = Object.values(messages)
        keys = keys.join(',')
        let parm = ''
        for (i = 0; i < values.length; i++) {
            parm += '?,'
        }
        parm = parm.slice(0, -1)
        let query = `INSERT INTO messages (${keys})
                     VALUES (${parm})
                     returning id`
        try {
            let result = await db.run_insert(query, values)
            // result = [ [ { id: 14 } ], 1 ]
            ctx.status = 201
            ctx.body = await getDBMessageById(result[0][0]['id'])
        } catch (error) {
            ctx.status = 400
            ctx.error = error
            ctx.body = {
                'error_code': 400,
                'error_message': error.message
            }
        }
    } catch (e) {
        ctx.status = 400
        ctx.body = {
            'error_code': 400,
            'error_message': e.message
        }
    }
}

async function deleteMessage(ctx) {
    try {
        let result = await deleteDBMessageById(ctx.params.messageId)
        ctx.status = 200
        ctx.body = result
    } catch (error) {
        ctx.status = 400
        ctx.error = error
        ctx.body = {
            'error_code': 400,
            'error_message': error.message
        }
    }
}

async function deleteDBMessageById(id) {
    let query = "UPDATE messages SET deleted = true WHERE id = ? RETURNING id, firstname, lastname, finding_id, message"
    let values = [id]
    let data = await db.run_delete(query, values)
    return data
}

async function getDBMessageByFindingId(findingId, deleted = false) {
    let query = "SELECT * FROM messages WHERE finding_id = ? AND deleted = ?"
    let values = [findingId, deleted]
    let data = await db.run_query(query, values)
    return data
}

async function getDBMessageById(id) {
    let query = "SELECT * FROM messages WHERE id = ?"
    let values = [id]
    let data = await db.run_query(query, values)
    return data
}

module.exports = router