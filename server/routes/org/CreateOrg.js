const errors = require('../../config/error.json');

async function CreateOrg(req, res) {
    const { user } = req;
    const { orgName } = req.body;

    // Error if the form does not contain an organization name
    if (!orgName) {
        return res.status(400).send(errors.Incomplete);
    }

    // Verify that no owned organizations have the same name
    const existing = await user.countOwnedOrg({
        where: { name: orgName },
    });
    if (existing > 0) {
        return res.status(409).send(errors.DuplicateName);
    }

    await user.createOwnedOrg({
        name: orgName,
    });

    return res.sendStatus(200);
}

module.exports = CreateOrg;
