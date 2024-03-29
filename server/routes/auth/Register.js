const forge = require("node-forge");

const { User, Organization } = require("../../db/models/index");
const errors = require("../../config/error.json");

async function Register(req, res) {
    const { body } = req;

    // Verify that the object body contains all SQL required fields
    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        return res.status(400).send(errors.Incomplete);
    }

    // Make sure that no existing user exists with that email
    const existingUsers = await User.count({
        where: {
            email: req.body.email,
        },
    });

    if (existingUsers > 0) {
        return res.status(409).send(errors.DuplicateName);
    }

    // Hash password for storage into database
    const passwordHash = forge.md.sha512
        .create()
        .update(body.password)
        .digest()
        .toHex();

    if (body.orgID) {
        try {
            // If there is an orgID attached, retrieve the organization and create user as member
            const org = await Organization.findByPk(body.orgID);

            if (!org) {
                // Create user regularly if organization is not found
                await User.create({
                    ...body,
                    password: passwordHash,
                });

                return res.sendStatus(200);
            }

            const { orgID, ...filteredBody } = body;

            await org.createMember({
                ...filteredBody,
                password: passwordHash,
            });

            return res.sendStatus(200);
        } catch (e) {
            return res.status(500).send(errors.Generic);
        }
    } else {
        try {
            // Create user regularly if their is no orgID
            await User.create({
                ...body,
                password: passwordHash,
            });

            return res.sendStatus(200);
        } catch (e) {
            return res.status(500).send(errors.Generic);
        }
    }
}

module.exports = Register;
