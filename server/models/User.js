const { DataTypes, Model } = require('sequelize');

class User extends Model {
    static initModel(sequelize) {
        User.init(
            {
                userID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
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
                prounouns: {
                    type: DataTypes.STRING,
                },
                gender: {
                    type: DataTypes.STRING,
                },
                race: {
                    type: DataTypes.STRING,
                },
                ethnicity: {
                    type: DataTypes.STRING,
                },
                createdAt: {
                    type: DataTypes.DATE,
                },
            },
            { sequelize }
        );

        return User;
    }
}

module.exports = User;
