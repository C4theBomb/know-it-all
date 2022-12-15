const { Token } = require('../../db/models/index');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    // Create token for user while setting expiry
    await Token.destroy({ where: { ownerID: user.id } });
    const newToken = await user.createToken({
        expires: remember,
    });

    return res.send({ token: newToken.id, user });
}

module.exports = Login;
