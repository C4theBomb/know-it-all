const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        static associate(models) {
            Organization.belongsTo(models.User, {
                as: 'orgOwner',
                foreignKey: 'ownerID',
            });
            Organization.belongsToMany(models.User, {
                as: 'orgMembers',
                through: 'OrgMembers',
                uniqueKey: 'orgID',
            });
        }
    }

    Organization.init(
        {
            orgID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            orgName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize }
    );

    return Organization;
};
