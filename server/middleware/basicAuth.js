const forge = require('node-forge');
const { User } = require('../db/models/index');

async function basicAuth(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // Make sure that email and password exists with in the form
    if (!email || !password) {
        return res.status(400).send('Request lacking information');
    }

    // Make sure that a user exists with that email
    const result = await User.findOne({
        where: { email: email },
    });
    if (!result) {
        return res.status(400).send('Unauthorized user');
    }

    // Hash the password and verify that the user hash is identical
    const hashedPassword = forge.md.sha512
        .create()
        .update(password)
        .digest()
        .toHex();

    if (hashedPassword === result.password) {
        req.user = result;
        return next();
    } else {
        return res.status(400).send('Unauthorized user');
    }
}

module.exports = basicAuth;
