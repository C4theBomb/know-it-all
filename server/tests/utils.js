const forge = require('node-forge');
const { User, Organization, Token } = require('../models/index');

async function createTestUser(firstName, lastName, password) {
    const hashedPassword = forge.md.sha512
        .create()
        .update(password)
        .digest()
        .toHex();
    const userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@test.com`,
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
        email: `${owner.firstName.toLowerCase()}.${owner.lastName.toLowerCase()}@test.com`,
        pronouns: 'they/them',
        password: hashedPassword,
    };

    return await Organization.create({ orgName, orgOwner: userInfo });
}

async function createTestToken(owner) {
    const user = await createTestUser(
        owner.firstName,
        owner.lastName,
        owner.password
    );
    return await user.createToken({
        userID: user.userID,
        expires: true,
    });
}

module.exports = { createTestUser, createTestOrg, createTestToken };
