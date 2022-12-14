const forge = require('node-forge');

const { User, Organization } = require('../../db/models/index');
const config = require('../../config/error.json');

async function CreateUser(req, res, next) {
    const body = req.body;

    // Verify that the object body contains all SQL required fields
    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Make sure that no existing user exists with that email
    const existingUsers = await User.count({
        where: {
            email: req.body.email,
        },
    });

    if (existingUsers > 0) {
        return res.status(500).send(config.errorDuplicateUser);
    }

    // Hash password for storage into database
    const passwordHash = forge.md.sha512.create().update(body.password).digest().toHex();

    if (body.orgID) {
        try {
            // If there is an orgID attached, retrieve the organization and create user as member
            const org = await Organization.findByPk(body.orgID);

            if (!org) {
                // Create user regularly if organization is not found
                const result = await User.create({
                    ...body,
                    password: passwordHash,
                });

                return res.send(result);
            }

            const { orgID, ...filteredBody } = body;

            const result = await org.createMember({
                ...filteredBody,
                password: passwordHash,
            });

            return res.send({ user: result, orgID });
        } catch (e) {
            console.log(e);

            return res.status(500).send(config.errorGeneric);
        }
    } else {
        try {
            // Create user regularly if their is not orgID
            const result = await User.create({
                ...body,
                password: passwordHash,
            });

            return res.send({ user: result });
        } catch (e) {
            console.log(e);

            return res.status(500).send(config.errorGeneric);
        }
    }
}

module.exports = CreateUser;
