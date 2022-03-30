const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate(models) {
            Token.belongsTo(models.User, {
                foreignKey: 'userID',
                onDelete: 'CASCADE',
            });
        }
    }

    Token.init(
        {
            tokenID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            expires: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        { sequelize }
    );

    return Token;
};
