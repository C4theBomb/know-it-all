const { Token } = require('../db/models/index');
const config = require('../config/error.json');

async function tokenAuth(req, res, next) {
    const token = req.query.token || req.body.token;

    // Verify that a token exists on the request
    if (!token) {
        return res.status(403).send(config.errorForbidden);
    }

    // Find token and make sure that it is not expired
    const result = await Token.findByPk(token);

    const date = new Date();

    // Destroy token if it is expired or does not exist
    if (!result) {
        return res.status(403).send(config.errorFailed);
    }

    if (token.expires == true && date.setDate(date.getDate() - 1) > result.createdAt) {
        await Token.destroy({ where: { id: token } });
        return res.status(511).send(config.errorUnauthed);
    }

    // Attach user object to request
    const user = await result.getUser();
    req.user = user;

    return next();
}

module.exports = tokenAuth;
