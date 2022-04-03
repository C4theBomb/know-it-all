'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reset_request', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('reset_request');
    },
};
