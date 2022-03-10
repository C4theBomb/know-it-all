async function GetOwnedGroups(req, res, next) {
    const user = req.user;

    const result = await user.getOwnedGroups();
    return res.send(result);
}

module.exports = GetOwnedGroups;
