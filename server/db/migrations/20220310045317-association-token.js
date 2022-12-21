module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('token', 'ownerID', {
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
        await queryInterface.removeColumn('token', 'ownerID');
    },
};
