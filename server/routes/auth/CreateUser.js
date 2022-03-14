const forge = require('node-forge');
const { User } = require('../../models/index');

async function CreateUser(req, res, next) {
    const body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        return res.status(400).send('The request is missing required fields.');
    }

    const existingUsers = await User.count({
        where: {
            email: req.body.email,
        },
    });

    if (existingUsers > 0) {
        return res.status(500).send('A user with that email already exists.');
    }

    try {
        const passwordHash = forge.md.sha512
            .create()
            .update(body.password)
            .digest()
            .toHex();
        const result = await User.create({ ...body, password: passwordHash });

        return res.send(result);
    } catch (e) {
        console.log(e);

        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = CreateUser;
