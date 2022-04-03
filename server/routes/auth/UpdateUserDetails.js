const { Op } = require('sequelize');
const { User } = require('../../db/models/index');

async function UpdateUserDetails(req, res, next) {
    const { token, ...body } = req.body;

    if (body.email) {
        const result = await User.findOne({
            where: {
                [Op.and]: {
                    email: body.email,
                    id: { [Op.not]: req.user.id },
                },
            },
        });

        if (result) {
            return res
                .status(500)
                .send('A user with that email already exists.');
        }
    }

    req.user.update({ ...body });
    return res.send(req.user);
}

module.exports = UpdateUserDetails;
