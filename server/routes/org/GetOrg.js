const { User, Organization } = require('../../models/index');

async function GetOrg(req, res, next) {
    const orgID = req.params.orgID;

    const verify = await Organization.findOne({
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

    if (!verify) {
        return res.status(500).send('There is no organization with this id.');
    }

    if (!verify.orgOwner && verify.orgMembers.length == 0) {
        return res
            .status(500)
            .send('You do not know any organizations with this id.');
    }

    const result = await Organization.findOne({
        where: { orgID: orgID },
        include: { model: User, as: 'orgMembers', required: false },
    });

    return res.send(result);
}

module.exports = GetOrg;
