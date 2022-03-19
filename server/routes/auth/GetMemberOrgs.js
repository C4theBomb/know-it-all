async function GetMemberOrgs(req, res, next) {
    const user = req.user;

    const result = await user.getMemberOrgs({
        attributes: { exclude: ['updatedAt'] },
    });

    return res.send(result);
}

module.exports = GetMemberOrgs;
