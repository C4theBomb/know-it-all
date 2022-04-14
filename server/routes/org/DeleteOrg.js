const { Organization } = require('../../db/models/index');

async function DeleteOrg(req, res, next) {
    const user = req.user;
    const orgID = req.query.orgID;

    // Error if an organization id was not provided
    if (!orgID) {
        return res.status(400).send('Form missing required fields');
    }

    // Destroy all organizations with that ID
    await Organization.destroy({
        where: { id: orgID, ownerID: user.id },
    });

    return res.send('Organization deleted');
}

module.exports = DeleteOrg;
