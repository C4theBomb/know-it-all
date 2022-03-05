const User = require('./User');
const Group = require('./Group');
const Organization = require('./Organization');
const Token = require('./Token');

async function initModels(sequelize) {
    User.initModel(sequelize);
    Organization.initModel(sequelize);
    Group.initModel(sequelize);
    Token.initModel(sequelize);

    User.hasMany(Group, { foreignKey: 'ownerID', onDelete: 'CASCADE' });
    Group.belongsTo(User, { foreignKey: 'ownerID' });

    User.hasOne(Organization, { foreignKey: 'ownerID', onDelete: 'CASCADE' });
    Organization.hasOne(Organization, { foreignKey: 'ownerID' });

    Organization.hasMany(Group, { foreignKey: 'ownerID', onDelete: 'CASCADE' });

    Group.belongsTo(Organization, { foreignKey: 'orgOwnerID' });

    User.hasOne(Token, { foreignKey: 'userID', onDelete: 'CASCADE' });
    Token.belongsTo(User, { foreignKey: 'userID' });

    User.belongsToMany(Organization, {
        through: 'orgUsers',
        foreignKey: 'userID',
    });
    Organization.belongsToMany(User, {
        through: 'orgUsers',
        uniqueKey: 'orgID',
    });

    User.belongsToMany(Group, {
        through: 'groupUsers',
        foreignKey: 'userID',
    });
    Group.belongsToMany(User, {
        through: 'groupUsers',
        foreignKey: 'groupID',
    });

    if (process.env.NODE_ENV == 'development') {
        await sequelize.sync({ logging: false, force: true });
    } else {
        await sequelize.sync({ logging: false, alter: true });
    }

    return { User, Group, Organization, Token };
}

module.exports = { User, Organization, Group, Token, initModels };
