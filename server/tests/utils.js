const forge = require("node-forge");
const { User } = require("../db/models/index");

async function createTestUser(firstName, lastName, password) {
    const hashedPassword = forge.md.sha512
        .create()
        .update(password)
        .digest()
        .toHex();
    const userInfo = {
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@test.com`,
        pronouns: "they/them",
        password: hashedPassword,
    };

    return User.create(userInfo);
}

async function createTestOrg(name, owner) {
    const hashedPassword = forge.md.sha512
        .create()
        .update(owner.password)
        .digest()
        .toHex();
    const userInfo = {
        ...owner,
        email: `${owner.firstName.toLowerCase()}.${owner.lastName.toLowerCase()}@test.com`,
        pronouns: "they/them",
        password: hashedPassword,
    };

    const user = await User.create(userInfo);
    const org = await user.createOwnedOrg({ name });

    return org;
}

async function createTestToken(owner) {
    const user = await createTestUser(
        owner.firstName,
        owner.lastName,
        owner.password
    );
    return user.createToken({
        expires: true,
    });
}

async function createTestResetRequest(owner) {
    const user = await createTestUser(
        owner.firstName,
        owner.lastName,
        owner.password
    );
    return user.createResetRequest();
}

module.exports = {
    createTestUser,
    createTestOrg,
    createTestToken,
    createTestResetRequest,
};
