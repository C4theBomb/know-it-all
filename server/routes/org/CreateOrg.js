const config = require('../../config/error.json');

async function CreateOrg(req, res, next) {
    const user = req.user;
    const orgName = req.body.orgName;

    // Error if the form does not contain an organization name
    if (!orgName) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Verify that no owned organizations have the same name
    const existing = await user.countOwnedOrg({
        where: { name: orgName },
    });
    if (existing > 0) {
        return res.status(500).send(config.errorFailed);
    }

    const org = await user.createOwnedOrg({
        name: orgName,
    });

    return res.status(200).send({ org });
}

module.exports = CreateOrg;
