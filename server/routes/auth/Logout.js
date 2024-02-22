async function Logout(req, res) {
    const { user } = req;
    const token = await user.getToken();

    if (token) {
        await token.destroy();
    }

    return res.sendStatus(200);
}

module.exports = Logout;
