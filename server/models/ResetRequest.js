const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize');

class ResetRequest extends Model {
    static initModel(sequelize) {
        ResetRequest.init(
            {
                reqID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    defaultValue: uuidv4,
                },
            },
            { sequelize }
        );

        return ResetRequest;
    }
}

module.exports = ResetRequest;
