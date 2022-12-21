const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ResetRequest extends Model {
        static associate(models) {
            ResetRequest.belongsTo(models.User, {
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
        }
    }

    ResetRequest.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        { sequelize, tableName: 'reset_request' },
    );

    return ResetRequest;
};
