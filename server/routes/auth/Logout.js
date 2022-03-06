async function Logout(req, res, next) {
    const user = req.user;
    const token = await user.getToken();
    await token.destroy();

    return res.send('User logged out');
}

module.exports = Logout;
