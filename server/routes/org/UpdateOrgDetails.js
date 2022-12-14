const config = require('../../config/error.json');

async function UpdateOrgDetails(req, res, next) {
    const user = req.user;
    const orgName = req.body.orgName;
    const orgID = req.body.orgID;

    // Verify that an name and id exist on the form
    if (!orgName || !orgID) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Confirm that an organization exists with that ID
    const result = await user.getOwnedOrg({ where: { id: orgID } });

    if (result.length < 1) {
        return res.status(403).send(config.errorForbidden);
    }

    // Update the name fo the organization
    result[0].update({ name: orgName });

    return res.send(result[0]);
}

module.exports = UpdateOrgDetails;
