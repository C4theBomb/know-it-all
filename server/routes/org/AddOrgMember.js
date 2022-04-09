const { Organization } = require('../../db/models/index');

async function AddOrgMember(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    // Verify that an organization exists with the ID provided
    const result = await Organization.findByPk(orgID);
    if (!result) {
        return res.status(404).send('No organization exists with that id.');
    }

    // Add the as a member to the found organization
    await result.addMember(user.id);

    return res.send('User added to organization.');
}

module.exports = AddOrgMember;
