const {Sequelize, QueryTypes} = require('sequelize')
const info = require('../config')
const sequelizeConnection = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)

exports.connect_database = async function connection_database(){
    try {
        await sequelizeConnection.authenticate()
    } catch (error) {
        console.error(error, query, values);
        throw 'Database query error'
    }
}

exports.close_database = async function close_database(){
    try {
        await sequelizeConnection.close()
    } catch (error) {
        console.error(error, query, values);
        throw 'Database query error'
    }
}

// define an async utility function to get a connection
// run an SQL query then end the connection
exports.run_query = async function run_query(query, values) {
    try {
        const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
        await sequelize.authenticate()

        let data = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.SELECT
        })

        await sequelize.close()
        return data
    } catch (error) {
        console.error(error, query, values);
        throw 'Database query error'
    }
}

exports.run_insert = async function run_insert(sql, values) {
    try {
        const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
        await sequelize.authenticate()
        console.log('start '+values)
        let data = await sequelize.query(sql, {
            replacements: values,
            type: QueryTypes.INSERT
        })
        console.log('end')
        await sequelize.close()
        console.log('return')
        return data
    } catch (error) {
        console.error(error, sql, values);
        throw 'Database query error'
    }
}

exports.run_update = async function run_update(sql, values) {
    try {
        const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
        await sequelize.authenticate()
        console.log('start '+values)
        let data = await sequelize.query(sql, {
            replacements: values,
            type: QueryTypes.UPSERT
        })
        console.log('end')
        await sequelize.close()
        console.log('return')
        return data
    } catch (error) {
        console.error(error, sql, values);
        throw 'Database query error'
    }
}


exports.run_delete = async function run_delete(sql, values) {
    try {
        const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
        await sequelize.authenticate()
        console.log('start '+values)
        let data = await sequelize.query(sql, {
            replacements: values,
            type: QueryTypes.DELETE})
        console.log('end')
        await sequelize.close()
        console.log('return')
        return data
    } catch (error) {
        console.error(error, sql, values);
        throw 'Database query error'
    }
}