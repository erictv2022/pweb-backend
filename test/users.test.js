const request = require('supertest')
const app = require('./app.test')
const info = require('../config')


// change to testing database
beforeAll(()=>{
    info.config.user = "nncwyouq"
    info.config.database = "nncwyouq"
    info.config.host = "tiny.db.elephantsql.com"
    info.config.password = "7Qwp5a-5cC6SFPtyE-sfVC6M9bZzxfXw"
})

describe('Get all users', () => {
    it('Return all users', async () => {
        const res = await request(app.callback()).get('/api/v1/users').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual("application/json")
    })
})

describe('Test non exist endpoint', () => {
    it('should fail', async () => {
        const res = await request(app.callback()).get('/api/v1/users/search').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual("application/json")
    })
})

afterAll(()=>{
    // remove all data for test
})