'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Tokens', 'userID', {
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
        await queryInterface.removeColumn('Tokens', 'userID');
    },
};
