const { User, Organization } = require('../../models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const result = await Organization.findOne({
        where: { orgID: orgID },
        include: { model: User, as: 'orgMembers', required: false },
    });

    return res.send(result);
}

module.exports = GetOrg;
