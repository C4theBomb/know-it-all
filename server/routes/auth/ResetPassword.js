const forge = require('node-forge');
const { ResetRequest } = require('../../models/index');

async function ResetPassword(req, res, next) {
    reqID = req.params.id;
    password = req.body.password;

    if (!password) {
        return res.status(400).send('Form missing required information.');
    }

    const result = await ResetRequest.findOne({ where: { reqID: reqID } });

    if (!result) {
        return res
            .status(404)
            .send('A reset request with this ID does not exist');
    }

    const hashedPassword = forge.md.sha512
        .create()
        .update(password)
        .digest()
        .toHex();

    const user = await result.getUser();
    await user.update({ password: hashedPassword });
    return res.send('Your password has been changed');
}

module.exports = ResetPassword;
