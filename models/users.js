const database = require('../helpers/database')
const {StatusCode} = require("../helpers/error-code");

exports.findByUsername = async function getByUsername(username) {
    const query = 'select * from users where username = ?'
    const user = await database.run_query(query, [username])
    return user
}

//get all the users from database
exports.getAll = async function getAll(page = 1, limit = 10, order = 'desc') {
    let query = "select * FROM users ORDER BY id ? LIMIT ? OFFSET ?;"
    let data = await database.run_query(query, [order, limit, limit * (page - 1)])
    return data
}

//create a new user in the database
exports.add = async function add(user) {
    let keys = Object.keys(user)
    let values = Object.values(user)
    keys = keys.join(',')
    let parm = ''
    for (i = 0; i < values.length; i++) {
        parm += '?,'
    }
    parm = parm.slice(0, -1)
    let query = `INSERT INTO users (${keys})
                 VALUES (${parm})`
    try {
        await database.run_update(query, values)
        return {"status": StatusCode.SuccessCreated}
    } catch (error) {
        return error
    }
}