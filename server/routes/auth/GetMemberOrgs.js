async function GetMemberOrgs(req, res, next) {
    const user = req.user;

    const result = await user.getMemberOrgs();
    return res.send(result);
}

module.exports = GetMemberOrgs;
