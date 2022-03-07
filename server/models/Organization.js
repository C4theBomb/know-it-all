const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize');

class Organization extends Model {
    static initModel(sequelize) {
        Organization.init(
            {
                orgID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    defaultValue: uuidv4,
                },
                orgName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                },
            },
            { sequelize }
        );

        return Organization;
    }
}

module.exports = Organization;
