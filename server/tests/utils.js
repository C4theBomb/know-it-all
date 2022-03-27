const forge = require('node-forge');
const { User, Organization } = require('../models/index');

async function createTestUser(firstName, lastName, password) {
    const hashedPassword = forge.md.sha512
        .create()
        .update(password)
        .digest()
        .toHex();
    const userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: `${firstName}.${lastName}@test.com`,
        pronouns: 'they/them',
        password: hashedPassword,
    };

    return await User.create(userInfo);
}

async function createTestOrg(orgName, owner) {
    const hashedPassword = forge.md.sha512
        .create()
        .update(owner.password)
        .digest()
        .toHex();
    const userInfo = {
        ...owner,
        email: `${owner.firstName}.${owner.lastName}@test.com`,
        pronouns: 'they/them',
        password: hashedPassword,
    };

    return await Organization.create({ orgName, userInfo });
}

module.exports = { createTestUser, createTestOrg };
