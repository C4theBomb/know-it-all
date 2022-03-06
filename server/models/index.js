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
        as: 'ownedGroups',
        foreignKey: 'ownerID',
        onDelete: 'CASCADE',
    });
    User.belongsToMany(Group, {
        as: 'memberGroups',
        through: 'groupUsers',
        foreignKey: 'userID',
    });
    User.hasOne(Organization, {
        as: 'ownedOrg',
        foreignKey: 'ownerID',
        onDelete: 'CASCADE',
    });
    User.belongsToMany(Organization, {
        as: 'memberOrgs',
        through: 'orgUsers',
        foreignKey: 'userID',
    });

    Group.belongsTo(User, { as: 'userOwner', foreignKey: 'ownerID' });
    Group.belongsToMany(User, {
        as: 'groupMember',
        through: 'groupMembers',
        foreignKey: 'groupID',
    });

    Organization.belongsTo(User, { as: 'orgOwner', foreignKey: 'ownerID' });
    Organization.belongsToMany(User, {
        as: 'orgMember',
        through: 'orgMembers',
        uniqueKey: 'orgID',
    });

    Token.belongsTo(User, { foreignKey: 'userID' });
    ResetRequest.belongsTo(User, { foreignKey: 'userID' });

    if (process.env.MIGRATE == 'true') {
        console.log('[INFO]: Formatting all tables');
        await sequelize.sync({ force: true });
    }

    return { User, Group, Organization, Token, ResetRequest };
}

module.exports = { User, Organization, Group, Token, ResetRequest, initModels };
