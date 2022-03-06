async function DeleteOrg(req, res, next) {
    const user = req.user;

    const result = await user.getOwnedOrg();
    await result.destroy();

    return res.send('Organization deleted');
}

module.exports = DeleteOrg;
