const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize');

class Token extends Model {
    static initModel(sequelize) {
        Token.init(
            {
                tokenID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    defaultValue: uuidv4,
                },
                expires: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
            },
            { sequelize }
        );

        return Token;
    }
}

module.exports = Token;
