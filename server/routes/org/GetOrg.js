const { Organization } = require('../../models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const org = await Organization.findByPk(orgID, {
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                association: 'orgOwner',
                attributes: {
                    exclude: ['userID', 'password', 'createdAt', 'updatedAt'],
                },
            },
            {
                association: 'orgMember',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },
                required: false,
            },
        ],
    });

    const status = org.ownerID == user.userID;

    return res.send({
        org,
        memberCount: org.orgMember.length,
        status,
    });
}

module.exports = GetOrg;
