const { User, Organization } = require('../../models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const org = await Organization.findByPk(orgID, {
        include: [
            { association: 'orgOwner', required: false },
            { association: 'orgMembers', required: false },
        ],
    });

    const status = org.orgOwner.userID == user.userID;

    return res.send({ org, status });
}

module.exports = GetOrg;
