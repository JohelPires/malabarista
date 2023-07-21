'use strict'

module.exports = (sequelize, DataTypes) => {
    const Conta = sequelize.define(
        'conta',
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
            descricao: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            saldo: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { freezeTableName: true }
    )
    Conta.associate = function (models) {
        Conta.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
        Conta.hasMany(models.Transacao)
    }
    return Conta
}
