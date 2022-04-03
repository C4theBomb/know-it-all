'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('org_members', {
            orgID: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            userID: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('org_members');
    },
};
