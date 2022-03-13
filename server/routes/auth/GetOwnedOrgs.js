async function GetOwnedOrgs(req, res, next) {
    const user = req.user;

    const result = await user.getOwnedOrg({
        attributes: { exclude: ['updatedAt'] },
    });
    return res.send(result);
}

module.exports = GetOwnedOrgs;
