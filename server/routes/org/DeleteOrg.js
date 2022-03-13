async function DeleteOrg(req, res, next) {
    const user = req.user;
    const orgID = req.query.orgID;

    await user.removeOwnedOrg({ where: { orgID: orgID } });

    return res.send('Organization deleted');
}

module.exports = DeleteOrg;
