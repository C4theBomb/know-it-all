const { DataTypes, Model } = require('sequelize');

class Group extends Model {
    static initModel(sequelize) {
        Group.init(
            {
                groupID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
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
    }
}

module.exports = Group;
