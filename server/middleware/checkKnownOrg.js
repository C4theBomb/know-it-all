const { Organization } = require('../db/models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID || req.query.orgID || req.body.orgID;

    const result = await Organization.findByPk(orgID, {
        include: [
            {
                association: 'owner',
                where: { id: user.id },
                required: false,
            },
            {
                association: 'member',
                where: { id: user.id },
                required: false,
            },
        ],
    });

    if (!result) {
        return res.status(500).send('There is no organization with this id.');
    }

    if (!result.owner && result.member.length == 0) {
        return res
            .status(403)
            .send('You do not know any organizations with this id.');
    }

    return next();
}

module.exports = GetOrg;
