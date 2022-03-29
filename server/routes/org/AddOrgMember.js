const { Organization } = require('../../models/index');

async function AddOrgMember(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const result = await Organization.findByPk(orgID);

    if (!result) {
        return res.status(404).send('No organization exists with that id.');
    }

    await result.addOrgMember(user.userID);

    return res.send('User added to organization.');
}

module.exports = AddOrgMember;
