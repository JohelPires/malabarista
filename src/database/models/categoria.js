const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const Usuario = require('../models/usuario')

const Categoria = sequelize.define(
    'categoria',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Usuario,
                key: 'id',
            },
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // 0 - Despesa, 1 - Receita
        },
    },
    { freezeTableName: true }
)
Categoria.associate = function (models) {
    Categoria.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
}

module.exports = Categoria
