const { Organization } = require('../../models/index');

async function AddOrgMember(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const result = await Organization.findOne({ where: { orgID: orgID } });

    if (!result) {
        return res.status(500).send('No organization exists with that id.');
    }

    await result.addOrgMember(user);

    return res.send('User added to organization.');
}

module.exports = AddOrgMember;
