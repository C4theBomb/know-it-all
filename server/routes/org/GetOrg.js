const { User, Organization } = require('../../models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const org = await Organization.findByPk(orgID, {
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                association: 'orgOwner',
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            },
            {
                association: 'orgMembers',
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
                required: false,
            },
        ],
    });

    const status = org.orgOwner.userID == user.userID;

    return res.send({
        org: { ...org, memberCount: org.orgMembers.length },
        status,
    });
}

module.exports = GetOrg;
