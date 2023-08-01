const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const Usuario = sequelize.define(
    'usuario',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
        },
        saldo: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { freezeTableName: true }
)
Usuario.associate = function (models) {
    Usuario.hasMany(models.Tarefa, { as: 'employes' })
}

module.exports = Usuario
