const { User } = require('../db/models/index');

async function checkKnownUser(req, res, next) {
    const user = req.user;
    const userID = req.params.userID || req.query.userID || req.body.userID;

    if (user.id == userID) {
        return next();
    }

    const result = await User.findByPk(userID, {
        include: [
            {
                association: 'ownedOrg',
                include: {
                    association: 'member',
                    where: { id: user.id },
                },
            },
            {
                association: 'memberOrg',
                include: [
                    {
                        association: 'owner',
                        where: { id: user.id },
                        required: false,
                    },
                    {
                        association: 'member',
                        where: { id: user.id },
                        required: false,
                    },
                ],
            },
        ],
    });

    if (!result) {
        return res.status(500).send('No user with that ID exists.');
    }

    const filteredResult = result.memberOrg.filter(
        (org) => org.member.length != 0 || org.owner
    );

    if (filteredResult.length == 0 && result.ownedOrg) {
        return res.status(403).send('You do not have contact with this user.');
    }

    return next();
}

module.exports = checkKnownUser;
