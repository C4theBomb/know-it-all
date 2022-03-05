const User = require('./User');
const Group = require('./Group');
const Organization = require('./Organization');
const Token = require('./Token');
const ResetRequest = require('./ResetRequest');

async function initModels(sequelize) {
    User.initModel(sequelize);
    Organization.initModel(sequelize);
    Group.initModel(sequelize);
    Token.initModel(sequelize);
    ResetRequest.initModel(sequelize);

    User.hasOne(Token, { foreignKey: 'userID', onDelete: 'CASCADE' });
    User.hasOne(ResetRequest, { foreignKey: 'userID', onDelete: 'CASCADE' });
    User.hasMany(Group, {
        as: 'groupOwner',
        foreignKey: 'ownerID',
        onDelete: 'CASCADE',
    });
    User.belongsToMany(Group, {
        as: 'memberGroups',
        through: 'groupUsers',
        foreignKey: 'userID',
    });
    User.hasOne(Organization, {
        as: 'orgOwner',
        foreignKey: 'ownerID',
        onDelete: 'CASCADE',
    });
    User.belongsToMany(Organization, {
        as: 'memberOrgs',
        through: 'orgUsers',
        foreignKey: 'userID',
    });

    Group.belongsTo(User, { as: 'userOwner', foreignKey: 'ownerID' });
    Group.belongsTo(Organization, {
        as: 'orgOwner',
        foreignKey: 'ownerID',
    });
    Group.belongsToMany(User, {
        through: 'groupUsers',
        foreignKey: 'groupID',
    });

    Organization.belongsTo(User, { foreignKey: 'ownerID' });

    Organization.hasMany(Group, {
        as: 'groupOwner',
        foreignKey: 'ownerID',
        onDelete: 'CASCADE',
    });

    Organization.belongsToMany(User, {
        through: 'orgUsers',
        uniqueKey: 'orgID',
    });

    Token.belongsTo(User, { foreignKey: 'userID' });
    ResetRequest.belongsTo(User, { foreignKey: 'userID' });

    if (process.env.NODE_ENV == 'development') {
        await sequelize.sync({ logging: false, force: true });
    } else {
        await sequelize.sync({ logging: false, alter: true });
    }

    return { User, Group, Organization, Token, ResetRequest };
}

module.exports = { User, Organization, Group, Token, ResetRequest, initModels };
