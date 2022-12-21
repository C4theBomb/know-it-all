const errors = require('../../config/error.json');

async function UpdateOrgDetails(req, res) {
    const { user } = req;
    const id = req.params.orgID;
    const { name } = req.body;

    // Verify that an name and id exist on the form
    if (!name) {
        return res.status(400).send(errors.Incomplete);
    }

    // Confirm that an organization exists with that ID
    const result = await user.getOwnedOrg({ where: { id } });

    if (result.length < 1) {
        return res.status(404).send(errors.NotFound);
    }

    // Verify that no owned organizations have the same name
    const existing = await user.countOwnedOrg({
        where: { name },
    });

    if (existing > 0) {
        return res.status(409).send(errors.DuplicateName);
    }

    // Update the name of the organization
    await result[0].update({ name });

    return res.sendStatus(200);
}

module.exports = UpdateOrgDetails;
