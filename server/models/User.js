const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize');

class User extends Model {
    static initModel(sequelize) {
        User.init(
            {
                userID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    defaultValue: uuidv4,
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
    }
}

module.exports = User;
