const { Organization } = require('../db/models/index');

const config = require('../config/error.json');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID || req.query.orgID || req.body.orgID;

    // Get all organizations by the provided ID, with a list of members and owner
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

    // Verify that there is an organization that the specified id.
    if (!result) {
        return res.status(404).send(config.errorNotFound);
    }

    // Verify that the user who submitted the request exists as an owner or member
    if (!result.owner && result.member.length == 0) {
        return res.status(403).send(config.errorForbidden);
    }

    return next();
}

module.exports = GetOrg;
