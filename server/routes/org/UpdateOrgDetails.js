async function UpdateOrgDetails(req, res, next) {
    const user = req.user;
    const orgName = req.body.orgName;

    if (!orgName) {
        return res.status(400).send('Form missing required information.');
    }

    const result = await user.getOwnedOrg();
    result.update({ orgName: orgName });

    return res.send(result);
}

module.exports = UpdateOrgDetails;
