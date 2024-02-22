const { Op } = require("sequelize");

const { User } = require("../../db/models/index");
const errors = require("../../config/error.json");

async function UpdateUserDetails(req, res) {
    const { token, ...body } = req.body;

    // Verify that the email is not a duplicate, if it exists
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
            return res.status(409).send(errors.DuplicateName);
        }
    }

    await req.user.update({ ...body });
    return res.sendStatus(200);
}

module.exports = UpdateUserDetails;
