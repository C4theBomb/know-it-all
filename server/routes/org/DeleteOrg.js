const { Organization } = require('../../db/models/index');

const errors = require('../../config/error.json');

async function DeleteOrg(req, res) {
    const { user } = req;
    const { orgID } = req.params;

    // Error if an organization id was not provided
    if (!orgID) {
        return res.status(400).send(errors.Incomplete);
    }

    // Destroy all organizations with that ID
    await Organization.destroy({
        where: { id: orgID, ownerID: user.id },
    });

    return res.sendStatus(200);
}

module.exports = DeleteOrg;
