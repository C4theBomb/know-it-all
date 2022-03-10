const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        static associate(models) {
            Group.belongsTo(models.User, {
                as: 'groupOwner',
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            Group.belongsToMany(models.User, {
                as: 'groupMembers',
                through: 'GroupMembers',
                foreignKey: 'groupID',
                onDelete: 'CASCADE',
            });
        }
    }

    Group.init(
        {
            groupID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            groupName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
        },
        { sequelize }
    );

    return Group;
};
