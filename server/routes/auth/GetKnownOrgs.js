async function GetUserDetails(req, res, next) {
    const user = req.user;
    const userID = req.params.userID;

    const result = await user.getMemberOrgs();
    return res.send(result);
}

module.exports = GetUserDetails;
