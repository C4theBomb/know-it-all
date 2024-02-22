const { Token } = require("../../db/models/index");

async function Login(req, res) {
    const { user } = req;
    const { remember } = req.body;

    // Create token for user while setting expiry
    await Token.destroy({ where: { ownerID: user.id } });
    const newToken = await user.createToken({
        expires: remember,
    });

    return res.send({ token: newToken.id, user });
}

module.exports = Login;
