async function CreateOrg(req, res, next) {
    const user = req.user;
    const orgName = req.body.orgName;

    if (!orgName) {
        return res.status(400).send('Form missing necessary fields');
    }

    const existing = await user.getOwnedOrgs();
    if (existing.map((org) => org.orgName).includes(orgName)) {
        return res
            .status(500)
            .send(
                'This user already has an organization with this name, please pick another.'
            );
    }

    const org = await user.createOwnedOrg({
        orgName: orgName,
    });

    return res.status(200).send(org);
}

module.exports = CreateOrg;
