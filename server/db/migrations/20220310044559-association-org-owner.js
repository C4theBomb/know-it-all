'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('organization', 'ownerID', {
            type: Sequelize.UUID,
            references: {
                model: 'user',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('organization', 'ownerID');
    },
};
