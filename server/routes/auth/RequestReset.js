const { CourierClient } = require("@trycourier/courier");

const { User } = require("../../db/models/index");
const errors = require("../../config/error.json");

async function RequestReset(req, res) {
    try {
        // Make sure that the request contains an email
        const { email } = req.body;
        if (!email) {
            return res.status(400).send(errors.Incomplete);
        }

        // Confirm that a user exists with that email
        const result = await User.findOne({ where: { email } });
        if (!result) {
            return res.status(404).send(errors.NotFound);
        }

        // Create resetRequest instance and send email containing reset information
        const courier = CourierClient({
            authorizationToken: process.env.COURIER_AUTH_TOKEN,
        });

        const resetRequest = await result.createResetRequest();

        await courier.send({
            message: {
                to: { email: result.email },
                template: "484W41FM494HX6H1RFRNAXNGQ28C",
                data: {
                    email: result.email,
                    resetRequest: resetRequest.id,
                    apiDomainRoot: process.env.CLIENT_DOMAIN_ROOT,
                },
            },
        });

        return res.sendStatus(200);
    } catch (e) {
        return res.status(500).send(errors.Generic);
    }
}

module.exports = RequestReset;
