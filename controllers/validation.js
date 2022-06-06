const {Validator, ValidationError} = require('jsonschema')
const petFindingSchema = require('../schemas/petfinding.schema.js')
const userSchema = require('../schemas/user.schema')
const StatusCode = require("../helpers/error-code");
const validator = new Validator()

const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
}

/**
 * A module to run JSON Schema based validation on request/response data. * @module controllers/validation
 * @author Eric Yu
 * @see schemas/* for JSON Schema definition files
 */
exports.validatePetFindings = async (ctx, next) => {
    await commonHandle(ctx, next, petFindingSchema)
}

/**
 * A module to run JSON Schema based validation on request/response data. * @module controllers/validation
 * @author Eric Yu
 * @see schemas/* for JSON Schema definition files
 */
exports.validateUser = async (ctx, next) => {
    await commonHandle(ctx, next, userSchema)
}

/**
 * Common handler for schema validation
 * @async
 * @param ctx request and response context
 * @param next next handler
 * @param schema need to validate
 */
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
