const request = require('supertest')
const app = require('./app.test')
const info = require('../config')
const constants = require('./constants')


// change to testing database
beforeAll(()=>{
    info.config.user = "nncwyouq"
    info.config.database = "nncwyouq"
    info.config.host = "tiny.db.elephantsql.com"
    info.config.password = "7Qwp5a-5cC6SFPtyE-sfVC6M9bZzxfXw"
})

const expected = [{
    "finding_id": 1,
}]

describe('Get all messages of specific finding', () => {
    it('Return all messages of specific finding', async () => {
        const res = await request(app.callback()).get('/api/v1/messages/finding/1').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual(constants.JSONFormat)
        expect(res.body.slice(0,1)).toMatchObject(expected)
        expect(res.body.length).toBeGreaterThan(0)
    })
})

describe('Get all messages of invalid finding ID', () => {
    it('Should return bad request', async () => {
        const res = await request(app.callback()).get('/api/v1/messages/finding/abc').send({})
        expect(res.statusCode).toEqual(404)
        expect(res.type).toEqual(constants.plaintextFormat)
    })
})

const expectedPostMessage = {
    "firstname": "eric",
    "lastname": "yu",
    "finding_id": 1,
    "email": "eric@example.com",
    "message": "i want to know more about this case 2"
}

describe('Create a messages for specific finding ID', () => {
    it('Should return the post message', async () => {
        const res = await request(app.callback()).post('/api/v1/messages/finding/1').send(
            expectedPostMessage
        )
        expect(res.statusCode).toEqual(201)
        expect(res.type).toEqual(constants.JSONFormat)
    })
})

afterAll(()=>{
    // remove all data for test
})