const forge = require('node-forge');
const { User } = require('../models/index');

async function basicAuth(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send('Request lacking information');
    }

    const result = await User.findOne({ where: { email: email } });

    if (!result) {
        return res.status(400).send('Unauthorized user');
    }

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
