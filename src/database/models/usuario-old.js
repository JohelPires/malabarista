'use strict'
module.exports = (sequelize, DataTypes) => {
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
        },
        { freezeTableName: true }
    )
    Usuario.associate = function (models) {
        Usuario.hasMany(models.Conta)
    }
    return Usuario
}
