const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const Usuario = require('../models/usuario')

const Transacao = sequelize.define(
    'transacao',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'id',
            },
        },
        id_conta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        descricao: {
            type: DataTypes.STRING,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATEONLY,
            // allowNull: false,
        },
        frequencia: {
            type: DataTypes.CHAR,
        },
        periodica: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { freezeTableName: true }
)
Transacao.associate = function (models) {
    Transacao.belongsTo(models.Conta, { foreignKey: 'id_conta' })
    Transacao.belongsTo(models.Categoria, { foreignKey: 'id_categoria' })
}

module.exports = Transacao
