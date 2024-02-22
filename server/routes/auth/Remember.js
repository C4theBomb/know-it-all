async function Remember(req, res) {
    const {user} = req;

    return res.send({
        user,
    });
}

module.exports = Remember;
