const {Validator, ValidationError} = require('jsonschema')
const petFindingSchema = require('../schemas/petfinding.schema.js')
const userSchema = require('../schemas/user.schema')
const StatusCode = require("status-code-enum");
const validator = new Validator()

const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
}

exports.validatePetFindings = async (ctx, next) => {
    await commonHandle(ctx, next, petFindingSchema)
}

exports.validateUser = async (ctx, next) => {
    await commonHandle(ctx, next, userSchema)
}

const commonHandle = async (ctx, next, schema) => {
    const body = ctx.request.body
    try {
        validator.validate(body, schema, validationOptions)
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error
            ctx.status = StatusCode.ClientErrorBadRequest
        } else {
            throw error
        }
    }
}
