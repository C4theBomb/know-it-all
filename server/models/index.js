const User = require('./User');
const Group = require('./Group');
const Organization = require('./Organization');

function initModels(sequelize) {
    User.initModel(sequelize);
    Organization.initModel(sequelize);
    Group.initModel(sequelize);

    User.hasMany(Group, { foreignKey: 'ownerID' });
    Group.belongsTo(User, { foreignKey: 'ownerID' });
    User.hasOne(Organization, { foreignKey: 'ownerID' });
    Organization.hasOne(Organization, { foreignKey: 'ownerID' });
    Organization.hasMany(Group, { foreignKey: 'ownerID' });
    Group.belongsTo(Organization, { foreignKey: 'orgOwnerID' });
    User.belongsToMany(Group, {
        through: 'OrganizationUsers',
        uniqueKey: 'userID',
    });
    Organization.belongsToMany(User, {
        through: 'OrganizationUsers',
        uniqueKey: 'organizationID',
    });
    User.belongsToMany(Group, {
        through: 'GroupUsers',
        uniqueKey: 'userID',
    });
    Group.belongsToMany(User, {
        through: 'GroupUsers',
        uniqueKey: 'groupID',
    });

    return { User, Group, Organization };
}

module.exports = { User, Organization, Group, initModels };
