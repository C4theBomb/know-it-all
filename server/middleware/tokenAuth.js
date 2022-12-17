const { Token } = require('../db/models/index');
const errors = require('../config/error.json');

async function tokenAuth(req, res, next) {
    const authHeader = req.get('Authorization');

    const token = authHeader?.split(' ')[1];

    // Verify token is included in request
    if (!token) return res.status(400).send(errors.Incomplete);

    const result = await Token.findOne({ token });

    // Verify token expiration
    const date = new Date();
    if (!result) {
        return res.status(401).send(errors.Unauthenticated);
    } else if (result.expires && date.setDate(date.getDate + 1) > result.createdAt) {
        await Token.findOneAndDelete({ token });
        return res.status(401).send(errors.Unauthenticated);
    }

    const user = await result.getUser();

    req.user = user;

    return next();
}

module.exports = tokenAuth;
