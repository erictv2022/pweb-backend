const database = require('../helpers/database')

exports.findByUsername = async function getByUsername(username) {
    const query = 'select * from users where username = ?'
    const user = await database.run_query(query, [username])
    return user
}

//get all the users from database
exports.getAll = async function getAll (page = 1, limit=10, order = 'desc') {
    let query = "select * FROM users ORDER BY id ? LIMIT ? OFFSET ?;"
    let data = await database.run_query(query, [order, limit, limit * (page - 1)])
    return data
}