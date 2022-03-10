'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Groups', 'ownerID', {
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
        await queryInterface.removeColumn('Groups', 'ownerID');
    },
};
