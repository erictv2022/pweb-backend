const db = require('../helpers/database')

//get a single petfinding by its id
exports.getById = async function getById(id) {
    let query = "SELECT * FROM petfindings WHERE ID = ?"
    let values = [id]
    let data = await db.run_query(query, values)
    return data
}

//list all the petfindings in the database
exports.getAll = async function getAll(page, limit = 100, order) {
    // TODO: use page, limit, order to give pagination
    let query = "SELECT * FROM petfindings limit ?;"
    let values = [limit]
    let data = await db.run_query(query, values)
    return data
}

exports.searchDB = async function searchDB(keywords) {
    let query = "SELECT * FROM petfindings WHERE breed ILIKE ? OR subbreed ILIKE ? OR shelter ILIKE ? OR summary ILIKE ?"
    let values = [`%${keywords}%`, `%${keywords}%`, `%${keywords}%`, `%${keywords}%`]
    console.log(values)
    let data = await db.run_query(query, values)
    return data
}

exports.searchDBBreed = async function searchDBBreed(keywords) {
    let query = "SELECT * FROM petfindings WHERE breed ILIKE ? OR subbreed ILIKE ?"
    let values = [`%${keywords}%`, `%${keywords}%`]
    console.log(values)
    let data = await db.run_query(query, values)
    return data
}

//create a new petfinding in the database
exports.add = async function add(petfinding) {
    let keys = Object.keys(petfinding)
    let values = Object.values(petfinding)
    keys = keys.join(',')
    let parm = ''
    for (i = 0; i < values.length; i++) {
        parm += '?,'
    }
    parm = parm.slice(0, -1)
    let query = `INSERT INTO petfindings (${keys}) VALUES (${parm}) returning id`
    try {
        return await db.run_insert(query, values)
    } catch (error) {
        return error
    }
}

//update petfinding in the database
exports.update = async function update(petfinding, id) {
    try {
        const params = petfinding
        params['id'] = id

        let query = "UPDATE petfindings SET breed = :breed, subbreed = :subbreed, shelter = :shelter, summary = :summary, imageurl = :imageurl, published = :published, userid = :userid WHERE id = :id returning id"

        await db.run_update(query, params)
        return {"status": 201}
    } catch (error) {
        return error
    }
}

//delete a petfinding in the database
exports.deleteById = async function deleteById(id) {
    let query = "DELETE FROM petfindings WHERE ID = ?"
    let values = [id]
    try {
        let data = await db.run_delete(query, values)
        return data
    } catch (error) {
        return error
    }
}