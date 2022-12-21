const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        static associate(models) {
            Organization.belongsTo(models.User, {
                as: 'owner',
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            Organization.belongsToMany(models.User, {
                as: 'member',
                through: 'org_members',
                foreignKey: 'orgID',
                onDelete: 'CASCADE',
            });
        }
    }

    Organization.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize, tableName: 'organization' },
    );

    return Organization;
};
