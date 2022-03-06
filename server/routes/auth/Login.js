const forge = require('node-forge');
const { Token } = require('../../models/index');

async function Login(req, res, next) {
    const remember = req.remember;
    const token = forge.md.sha512
        .create()
        .update(`${new Date()}${req.user.email}`)
        .digest()
        .toHex();

    await Token.destroy({ where: { userID: req.user.userID } });
    const newToken = await Token.create({
        userID: req.user.userID,
        expires: remember,
    });

    res.send(newToken.tokenID);
}

module.exports = Login;
