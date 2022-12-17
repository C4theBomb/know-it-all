const { Organization } = require('../db/models/index');

const errors = require('../config/error.json');

async function checkKnownOrg(req, res, next) {
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
        return res.status(404).send(errors.NotFound);
    }

    // Verify that the user who submitted the request exists as an owner or member
    if (!result.owner && result.member.length == 0) {
        return res.status(403).send(errors.Forbidden);
    }

    return next();
}

module.exports = checkKnownOrg;
