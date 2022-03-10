'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('GroupMembers', {
            groupID: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            ownerID: {
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
        await queryInterface.dropTable('GroupMembers');
    },
};
