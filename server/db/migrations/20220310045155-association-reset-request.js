module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('reset_request', 'ownerID', {
            type: Sequelize.UUID,
            references: {
                model: 'user',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('reset_request', 'ownerID');
    },
};
