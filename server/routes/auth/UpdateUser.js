const { Op } = require('sequelize');
const { User } = require('../../models/index');

async function UpdateUser(req, res, next) {
    const { token, ...body } = req.body;

    if (body.email) {
        const result = await User.findOne({
            where: {
                [Op.and]: {
                    email: body.email,
                    userID: { [Op.not]: req.user.userID },
                },
            },
        });

        if (result) {
            return res
                .status(400)
                .send('A user with that email already exists.');
        }
    }

    req.user.update({ ...body });
    return res.status(200).send('Account details changed.');
}

module.exports = UpdateUser;
