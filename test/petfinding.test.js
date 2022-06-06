const request = require('supertest')
const app = require('./app.test')
const info = require('../config')

expected = [{
    "id": 1,
    "breed": "poodle",
    "subbreed": null,
    "location": "HKG",
    "summary": "brown baby",
    "datecreated": "2022-06-05T19:49:23.500Z",
    "datemodified": "2022-06-05T19:49:23.500Z",
    "imageurl": null,
    "published": null,
    "userid": 0
}]

// change to testing database
beforeAll(()=>{
    info.config.user = "nncwyouq"
    info.config.database = "nncwyouq"
    info.config.host = "tiny.db.elephantsql.com"
    info.config.password = "7Qwp5a-5cC6SFPtyE-sfVC6M9bZzxfXw"
})

describe('Get all pet findings', () => {
    it('Return all pet findings', async () => {
        const res = await request(app.callback()).get('/api/v1/petfindings').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual("application/json")
        expect(res.body).toContainEqual(expected)
    })
})

describe('Get finding by id', () => {
    it('Get finding by id', async () => {
        const res = await request(app.callback()).get('/api/v1/petfindings/1').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual("application/json")
    })
})