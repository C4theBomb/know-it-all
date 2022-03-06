const { User, Organization } = require('../../models/index');

async function GetOrgMembers(req, res, next) {
    const orgID = req.params.orgID;

    const result = await Organization.findOne({
        where: { orgID: orgID },
        include: { model: User, as: 'orgMembers', required: false },
    });

    return res.send(result.orgMembers);
}

module.exports = GetOrgMembers;
