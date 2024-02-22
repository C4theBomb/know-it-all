const { User } = require("../../db/models/index");

async function GetUserDetails(req, res) {
    const { userID } = req.params;

    // Retrieve user while excluding sensitive information
    const result = await User.findOne({
        where: { id: userID },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    return res.send({ user: result });
}

module.exports = GetUserDetails;
