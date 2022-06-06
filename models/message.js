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
    message: {type: DataTypes.STRING},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    createdDate: {type: DataTypes.DATE},
    findingId: {type: DataTypes.INTEGER},
}, {
    freezeTableName: true
});

module.exports = Message

exports.createMessage = function (firstname, lastname, message, findingId) {
    return Message.sync().then(() => {
        return Message.create({
            firstname: firstname,
            lastname: lastname,
            message: message,
            findingId: findingId
        })
    })
}

