const { Op } = require('sequelize');

const { Organization, User } = require('../../models/index');

async function GetOrgDetails(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const result = await Organization.findOne({ where: { orgID: orgID } });
    const check = await Organization.findOne({
        where: { orgID: orgID },
        include: [
            {
                model: User,
                as: 'orgOwner',
                where: { userID: user.userID },
                required: false,
            },
            {
                model: User,
                as: 'orgMembers',
                where: { userID: user.userID },
                required: false,
            },
        ],
    });

    if (!check) {
        return res.status(500).send('There is no organization with this id.');
    }

    if (!check.orgOwner && check.orgMembers.length == 0) {
        return res
            .status(500)
            .send('You do not know any organizations with this id.');
    }

    return res.send(result);
}

module.exports = GetOrgDetails;
