const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate(models) {
            Token.belongsTo(models.User, {
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
        }
    }

    Token.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            expires: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        { sequelize, tableName: 'token' },
    );

    return Token;
};
