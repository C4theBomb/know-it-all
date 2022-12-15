const { User } = require('../../db/models/index');

async function GetUserDetails(req, res, next) {
    const userID = req.params.userID;

    // Retrieve user while excluding sensitive information
    const result = await User.findOne({
        where: { id: userID },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    return res.send({ user: result });
}

module.exports = GetUserDetails;
