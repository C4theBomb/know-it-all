const { User } = require('../models/index');

async function checkKnownUser(req, res, next) {
    const user = req.user;
    const userID = req.params.userID || req.query.userID || req.body.userID;

    if (user.userID == userID) {
        return next();
    }

    const result = await User.findOne({
        where: { userID: user.userID },
        include: [
            {
                association: 'ownedOrg',
                include: {
                    association: 'orgMembers',
                    where: { userID: user.userID },
                },
            },
            {
                association: 'memberOrgs',
                include: [
                    {
                        association: 'orgMembers',
                        where: { userID: user.userID },
                        required: false,
                    },
                    {
                        association: 'orgOwner',
                        where: { userID: user.userID },
                        required: false,
                    },
                ],
            },
        ],
    });

    if (!result) {
        return res.status(500).send('No user with that ID exists.');
    }

    const filteredResult = result.memberOrgs.filter(
        (org) => org.orgMembers.length != 0 || org_owner
    );

    if (filteredResult.length == 0 && result.ownedOrg) {
        return res.status(403).send('You do not have contact with this user.');
    }

    return next();
}

module.exports = checkKnownUser;
