async function GetUserDetails(req, res, next) {
    const { userID, password, updatedAt, ...user } = req.user.dataValues;

    return res.send(user);
}

module.exports = GetUserDetails;
