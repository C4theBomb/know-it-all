const { Token } = require('../../db/models/index');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    await Token.destroy({ where: { ownerID: user.id } });
    const newToken = await user.createToken({
        expires: remember,
    });

    return res.send({ userID: user.id, token: newToken.id });
}

module.exports = Login;
