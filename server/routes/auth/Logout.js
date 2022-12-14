async function Logout(req, res, next) {
    const user = req.user;
    const token = await user.getToken();

    if (token) {
        await token.destroy();
    }

    return res.sendStatus(200);
}

module.exports = Logout;
