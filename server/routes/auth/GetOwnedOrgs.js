async function GetOwnedOrgs(req, res) {
    // Retrieve all organizations the user owns
    const { user } = req;

    const result = await user.getOwnedOrg({
        attributes: { exclude: ["updatedAt"] },
    });
    return res.send({ orgs: result });
}

module.exports = GetOwnedOrgs;
