'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('ResetRequests', 'userID', {
            type: Sequelize.UUID,
            references: {
                model: 'Users',
                key: 'userID',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('ResetRequests', 'userID');
    },
};
