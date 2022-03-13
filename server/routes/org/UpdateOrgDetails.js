async function UpdateOrgDetails(req, res, next) {
    const user = req.user;
    const orgName = req.body.orgName;
    const orgID = req.body.orgID;

    if (!orgName) {
        return res.status(400).send('Form missing required information.');
    }

    const result = await user.getOwnedOrgs({ where: { orgID: orgID } });
    result[0].update({ orgName: orgName });

    return res.send(result);
}

module.exports = UpdateOrgDetails;
