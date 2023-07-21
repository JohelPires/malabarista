'use strict'
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        'categoria',
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
        },
        { freezeTableName: true }
    )
    Categoria.associate = function (models) {
        Categoria.hasOne(models.Transacao)
    }
    return Categoria
}
