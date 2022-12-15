const { Organization } = require('../../db/models/index');

const config = require('../../config/error.json');

async function DeleteOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    // Error if an organization id was not provided
    if (!orgID) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Destroy all organizations with that ID
    await Organization.destroy({
        where: { id: orgID, ownerID: user.id },
    });

    return res.sendStatus(200);
}

module.exports = DeleteOrg;
