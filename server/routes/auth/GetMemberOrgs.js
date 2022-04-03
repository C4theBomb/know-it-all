async function GetMemberOrgs(req, res, next) {
    const user = req.user;

    const result = await user.getMemberOrg({
        attributes: { exclude: ['updatedAt'] },
    });

    return res.send(result);
}

module.exports = GetMemberOrgs;
