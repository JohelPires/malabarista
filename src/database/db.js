const Sequelize = require('sequelize')

const sequelize = new Sequelize('malabarista_dev', 'postgres', '123', {
    dialect: 'postgres',
    host: 'localhost',
})

module.exports = sequelize
