const db = require('../helpers/database')

//get a single petfinding by its id
exports.getById = async function getById (id) {
    let query = "SELECT * FROM petfindings WHERE ID = ?"
    let values = [id]
    let data = await db.run_query(query, values)
    return data
}

//list all the petfindings in the database
exports.getAll = async function getAll (page, limit = 10, order) {
    // TODO: use page, limit, order to give pagination
    let query = "SELECT * FROM petfindings limit ?;"
    let values = [limit]
    let data = await db.run_query(query, values)
    return data
}

//create a new petfinding in the database
exports.add = async function add (petfinding) {
    let keys = Object.keys(petfindings)
    let values = Object.values(petfindings)
    keys = keys.join(',')
    let parm = ''
    for(i=0; i<values.length; i++){ parm +='?,'}
    parm=parm.slice(0,-1)
    let query = `INSERT INTO petfindings (${keys}) VALUES (${parm})`
    try{
        await db.run_update(query, values)
        return {"status": 201}
    } catch(error) {
        return error
    }
}

//create a new petfinding in the database
exports.deleteById = async function deleteById (id) {
    let query = "DELETE FROM petfindings WHERE ID = ?"
    let values = [id]
    try{
        let data = await db.run_delete(query, values)
        return data
    } catch(error) {
        return error
    }
}