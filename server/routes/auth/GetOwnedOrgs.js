async function GetOwnedGroups(req, res, next) {
    const user = req.user;

    const result = await user.getOwnedOrgs({
        attributes: { exclude: ['updatedAt'] },
    });
    return res.send(result);
}

module.exports = GetOwnedGroups;
