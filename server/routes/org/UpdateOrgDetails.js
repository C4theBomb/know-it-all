const config = require('../../config/error.json');

async function UpdateOrgDetails(req, res, next) {
    const user = req.user;
    const id = req.params.id;
    const name = req.body.name;

    // Verify that an name and id exist on the form
    if (!name) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Confirm that an organization exists with that ID
    const result = await user.getOwnedOrg({ where: { id } });

    if (result.length < 1) {
        return res.status(404).send(config.errorNotFound);
    }

    // Update the name of the organization
    result[0].update({ name });

    return res.sendStatus(200);
}

module.exports = UpdateOrgDetails;
