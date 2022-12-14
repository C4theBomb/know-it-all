const { User } = require('../../db/models/index');

async function GetUserDetails(req, res, next) {
    const user = req.user;
    const userID = req.params.userID;

    // Immediately respond if user is querying themselves
    if (user.id == userID) {
        return res.send({ user });
    }

    // Retrieve user while excluding sensitive information
    const result = await User.findOne({
        where: { id: userID },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    return res.send({ user: result });
}

module.exports = GetUserDetails;
