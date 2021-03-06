const { Token } = require('../db/models/index');

async function tokenAuth(req, res, next) {
    const token = req.query.token || req.body.token;

    if (!token) {
        return res.status(403).send('Unauthorized user');
    }

    const result = await Token.findByPk(token);

    const date = new Date();

    if (
        !result ||
        (token.expires == true &&
            date.setDate(date.getDate + 1) > result.createdAt)
    ) {
        await Token.destroy({ where: { id: token } });
        return res.status(511).send('Session expired');
    }

    const user = await result.getUser();
    req.user = user;

    return next();
}

module.exports = tokenAuth;
