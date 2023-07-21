'use strict'
module.exports = (sequelize, DataTypes) => {
    const Transacao = sequelize.define(
        'transacao',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            id_conta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            descricao: {
                type: DataTypes.STRING,
            },
            valor: {
                type: DataTypes.FLOAT,
                allowNull: false,
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
            },
        },
        { freezeTableName: true }
    )
    Transacao.associate = function (models) {
        Transacao.belongsTo(models.Conta, { foreignKey: 'id_conta' })
        Transacao.belongsTo(models.Categoria, { foreignKey: 'id_categoria' })
    }
    return Transacao
}
