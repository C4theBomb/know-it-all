async function Logout(req, res, next) {
    const user = req.user;
    const token = await user.getToken();

    if (token) {
        await token.destroy();
    }

    return res.send('User logged out');
}

module.exports = Logout;
