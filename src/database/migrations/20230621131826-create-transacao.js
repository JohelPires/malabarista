'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transacao', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_conta: {
                type: Sequelize.INTEGER,
            },
            data_hora: {
                type: Sequelize.DATE,
            },
            tipo: {
                type: Sequelize.INTEGER,
            },
            descricao: {
                type: Sequelize.STRING,
            },
            valor: {
                type: Sequelize.FLOAT,
            },
            frequencia: {
                type: Sequelize.CHAR,
            },
            periodica: {
                type: Sequelize.BOOLEAN,
            },
            id_categoria: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transacao')
    },
}
