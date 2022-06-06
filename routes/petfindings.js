const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/petfindings')
const {validatePetFindings} = require('../controllers/validation')

const auth = require('../controllers/authentication')

const router = Router({prefix: '/api/v1/petfindings'})

router.get('/', getAll)
router.post('/', bodyParser(), validatePetFindings, createPetFinding)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})', auth, updatePetFinding)
router.del('/:id([0-9]{1,})', auth, deletePetFinding)

/**
 * Get all the pet findings
 * @async
 */
async function getAll(ctx, next) {
    let results = await model.getAll()
    if (results.length) {
        ctx.body = results
    }
}

/**
 * Get the pet finding by id
 * @async
 */
async function getById(ctx) {
    let id = ctx.params.id
    let petFinding = await model.getById(id)
    if (petFinding.length) {
        ctx.body = petFinding[0]
    }
}

/**
 * Create a pet finding record
 * @async
 */
async function createPetFinding(ctx) {
    const body = ctx.request.body
    try {
        let result = await model.add(body)
        if (result) {
            ctx.status = 201
            ctx.body = result
        } else {
            ctx.status = 201
            ctx.body = "{}"
        }
    } catch (e) {
        ctx.status = 400
    }
}

/**
 * Update a existing pet finding records
 * @async
 */
async function updatePetFinding(ctx) {
    const body = ctx.request.body
    let result = await model.add(body)
    if (result) {
        ctx.status = 201
        ctx.body = result
    } else {
        ctx.status = 201
        ctx.body = "{}"
    }
}

/**
 * Delete a pet finding record by id
 * @async
 */
async function deletePetFinding(ctx) {
    let idToDelete = ctx.params.id
    try {
        let result = await model.deleteById(idToDelete)
        ctx.status = 204
        ctx.body = {'id': idToDelete}
    } catch (e) {
        ctx.status = 404
    }
}

module.exports = router;
