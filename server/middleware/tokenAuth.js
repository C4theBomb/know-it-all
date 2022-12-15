const { Token } = require('../db/models/index');
const config = require('../config/error.json');

async function tokenAuth(req, res, next) {
    const authHeader = req.get('Authorization');

    const token = authHeader?.split(' ')[1];

    // Verify token is included in request
    if (!token) return res.status(400).send(config.errorIncomplete);

    const result = await Token.findOne({ token });

    // Verify token expiration
    const date = new Date();
    if (!result) {
        return res.status(401).send(config.errorUnauthed);
    } else if (result.expires && date.setDate(date.getDate + 1) > result.createdAt) {
        await Token.findOneAndDelete({ token });
        return res.status(401).send(config.errorUnauthed);
    }

    const user = await token.getUser();

    if (!user) return res.status(500).send(config.errorGeneric);

    req.user = user;

    return next();
}

module.exports = tokenAuth;
