module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('token', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            expires: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('token');
    },
};
