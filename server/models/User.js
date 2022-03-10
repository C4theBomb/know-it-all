const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Token, {
                foreignKey: 'userID',
                onDelete: 'CASCADE',
            });
            User.hasOne(models.ResetRequest, {
                foreignKey: 'userID',
                onDelete: 'CASCADE',
            });
            User.hasMany(models.Group, {
                as: 'ownedGroups',
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            User.belongsToMany(models.Group, {
                as: 'memberGroups',
                through: 'groupUsers',
                foreignKey: 'userID',
            });
            User.hasOne(models.Organization, {
                as: 'ownedOrg',
                foreignKey: 'ownerID',
                onDelete: 'CASCADE',
            });
            User.belongsToMany(models.Organization, {
                as: 'memberOrgs',
                through: 'orgUsers',
                foreignKey: 'userID',
            });
        }
    }

    User.init(
        {
            userID: {
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
            gender: {
                type: DataTypes.STRING,
            },
            ethnicity: {
                type: DataTypes.STRING,
            },
        },
        { sequelize }
    );

    return User;
};
