const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        static associate(models) {
            Organization.belongsTo(models.User, {
                as: 'orgOwner',
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            Organization.belongsToMany(models.User, {
                as: 'orgMember',
                through: 'OrgMembers',
                uniqueKey: 'orgID',
                onDelete: 'CASCADE',
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
