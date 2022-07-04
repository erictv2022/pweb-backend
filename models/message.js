const {Sequelize, Model, DataTypes} = require('sequelize');
const info = require('../config')

const sequelize = new Sequelize(info.config.database, info.config.user, info.config.password, {
    host: `${info.config.host}:${info.config.port}`,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const Message = sequelize.define('message', {
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    finding_id: {type: DataTypes.INTEGER},
    create_date: {type: DataTypes.DATE},
    deleted: {type: DataTypes.BOOLEAN},
    email: {type: DataTypes.STRING},
    message: {type: DataTypes.STRING},
}, {
    freezeTableName: true
});

module.exports = Message

exports.createMessage = function (firstname, lastname, message, findingId, email) {
    return Message.sync().then(() => {
        return Message.create({
            firstname: firstname,
            lastname: lastname,
            message: message,
            findingId: findingId,
            email: email,
        })
    })
}

