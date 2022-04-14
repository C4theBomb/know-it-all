const { Organization } = require('../../db/models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    // Retrieve organization, owner, and members
    const org = await Organization.findByPk(orgID, {
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                association: 'owner',
                attributes: {
                    exclude: ['id', 'password', 'createdAt', 'updatedAt'],
                },
            },
            {
                association: 'member',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },
                required: false,
            },
        ],
    });

    // Verify whether user is an owner of the organization
    const status = org.ownerID == user.id;

    return res.send({
        org,
        memberCount: org.member.length,
        status,
    });
}

module.exports = GetOrg;
