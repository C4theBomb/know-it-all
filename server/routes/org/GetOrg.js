const { Organization } = require('../../db/models/index');

async function GetOrg(req, res) {
    const { user } = req;
    const { orgID } = req.params;

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

    return res.send({
        org,
        memberCount: org.member.length,
        owner: org.ownerID === user.id,
    });
}

module.exports = GetOrg;
