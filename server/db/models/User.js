const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Token, {
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            User.hasOne(models.ResetRequest, {
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            User.hasMany(models.Organization, {
                as: 'ownedOrg',
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            User.belongsToMany(models.Organization, {
                as: 'memberOrg',
                through: 'org_members',
                foreignKey: 'userID',
                onDelete: 'CASCADE',
            });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pronouns: {
                type: DataTypes.STRING,
            },
        },
        { sequelize, tableName: 'user' }
    );

    return User;
};
