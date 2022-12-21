async function GetMemberOrgs(req, res) {
    // Retrieve all of the organizations the user is a part of
    const { user } = req;

    const result = await user.getMemberOrg({
        attributes: { exclude: ['updatedAt'] },
    });

    return res.send({ orgs: result });
}

module.exports = GetMemberOrgs;
