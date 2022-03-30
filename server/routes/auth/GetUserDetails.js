const { User } = require('../../db/models/index');

async function GetUserDetails(req, res, next) {
    const user = req.user;
    const userID = req.params.userID;

    if (user.userID == userID) {
        return res.send(user);
    }

    const result = await User.findOne({
        where: { userID: userID },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    return res.send(result);
}

module.exports = GetUserDetails;
