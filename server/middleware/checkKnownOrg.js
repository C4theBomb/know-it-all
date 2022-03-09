const { User, Organization } = require('../models/index');

async function GetOrg(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID || req.query.orgID || req.body.orgID;

    const verify = await Organization.findOne({
        where: { orgID: orgID },
        include: [
            {
                association: 'orgOwner',
                where: { userID: user.userID },
                required: false,
            },
            {
                association: 'orgMembers',
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

    return next();
}

module.exports = GetOrg;
