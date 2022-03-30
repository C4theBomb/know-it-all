const { Token } = require('../../db/models/index');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    await Token.destroy({ where: { userID: req.user.userID } });
    const newToken = await Token.create({
        userID: req.user.userID,
        expires: remember,
    });

    return res.send({ userID: user.userID, token: newToken.tokenID });
}

module.exports = Login;
