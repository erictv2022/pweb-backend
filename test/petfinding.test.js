const request = require('supertest')
const app = require('./app.test')
const info = require('../config')
const constants = require('./constants')

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
    })
})

describe('Get finding by id', () => {
    it('Get finding by id', async () => {
        const res = await request(app.callback()).get('/api/v1/petfindings/1').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual("application/json")
    })
})


describe('Search finding by keywrod', () => {
    it('Return all items contains the keyword', async () => {
        const res = await request(app.callback()).get('/api/v1/petfindings/search/age').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual(constants.JSONFormat)
        expect(res.body.length).toBeGreaterThan(0)
    })
})


describe('Search finding by breed', () => {
    it('Return all items the same breed', async () => {
        const res = await request(app.callback()).get('/api/v1/petfindings/search/breed/poodle').send({})
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual(constants.JSONFormat)
        expect(res.body.length).toBeGreaterThan(0)
    })
})

expectedInvalidItem = {
    "id": 1,
    "breed": null,
    "subbreed": null,
    "shelter": "HKG",
    "summary": "brown baby",
    "datecreated": "2022-06-05T19:49:23.500Z",
    "datemodified": "2022-06-05T19:49:23.500Z",
    "imageurl": null,
    "published": null,
    "userid": 0
}

describe('Create a new pet finding', () => {
    it('Create a new pet finding', async () => {
        const res = await request(app.callback()).post('/api/v1/petfindings/').send(
            expectedInvalidItem
        )
        expect(res.statusCode).toEqual(400)
        expect(res.type).toEqual("application/json")
    })
})