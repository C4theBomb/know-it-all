async function UpdateOrgDetails(req, res, next) {
    const user = req.user;
    const orgName = req.body.orgName;
    const orgID = req.body.orgID;

    if (!orgName || !orgID) {
        return res.status(400).send('Form missing required information.');
    }

    const result = await user.getOwnedOrg({ where: { orgID: orgID } });

    if (result.length < 1) {
        return res.status(400).send('No organzation with that ID exists.');
    }

    result[0].update({ orgName: orgName });

    return res.send(result);
}

module.exports = UpdateOrgDetails;
