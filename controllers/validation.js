const {Validator, ValidationError} = require('jsonschema')
const petFindingSchema = require('../schemas/petfinding.schema.js');
const v = new Validator()

exports.validatePetFindings = async (ctx, next) => {

    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    }
    const body = ctx.request.body

    try {
        v.validate(body, petFindingSchema, validationOptions)
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error
            ctx.status = 400
        } else {
            throw error
        }
    }
}
