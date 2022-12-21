const { Organization } = require('../../db/models/index');

const errors = require('../../config/error.json');

async function AddOrgMember(req, res) {
    const { user } = req;
    const { orgID } = req.params;

    // Verify that an organization exists with the ID provided
    const result = await Organization.findByPk(orgID);
    if (!result) {
        return res.status(404).send(errors.NotFound);
    }

    // Add the as a member to the found organization
    await result.addMember(user.id);

    return res.sendStatus(200);
}

module.exports = AddOrgMember;
