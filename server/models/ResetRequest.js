const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ResetRequest extends Model {
        static associate(models) {
            ResetRequest.belongsTo(models.User, { foreignKey: 'userID' });
        }
    }

    ResetRequest.init(
        {
            reqID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        { sequelize }
    );

    return ResetRequest;
};
