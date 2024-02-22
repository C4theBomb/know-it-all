const forge = require("node-forge");

const { ResetRequest } = require("../../db/models/index");
const errors = require("../../config/error.json");

async function ResetPassword(req, res) {
    const reqID = req.params.id;
    const { password } = req.body;

    // Verify that the form contains a new password
    if (!password) {
        return res.status(400).send(errors.Incomplete);
    }

    // Confirm that there is a reset request for the user with that ID
    const result = await ResetRequest.findByPk(reqID);
    if (!result) {
        return res.status(500).send(errors.Generic);
    }

    // Hash the submitted password and update model
    const hashedPassword = forge.md.sha512
        .create()
        .update(password)
        .digest()
        .toHex();

    const user = await result.getUser();
    await user.update({ password: hashedPassword });
    return res.sendStatus(200);
}

module.exports = ResetPassword;
