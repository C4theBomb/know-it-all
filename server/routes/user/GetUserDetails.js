async function GetUserDetails(req, res, next) {
    const { userID, password, createdAt, updatedAt, ...user } =
        req.user.dataValues;

    res.status(200).send(user);
}

module.exports = GetUserDetails;
