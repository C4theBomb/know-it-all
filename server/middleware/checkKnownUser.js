const { User } = require('../db/models/index');

async function checkKnownUser(req, res, next) {
    const user = req.user;
    const userID = req.params.userID || req.query.userID || req.body.userID;

    // Return result immediately if the user is querying themselves
    if (user.id == userID) {
        return next();
    }

    // Find the queried user and the members of their owned organizations and owner/members of their member organizations
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

    // Confirm that a user with that ID exists within the database
    if (!result) {
        return res.status(500).send('No user with that ID exists.');
    }

    // Filter for an organization where the user is a member or an owner
    const filteredResult = result.memberOrg.filter(
        (org) => org.member.length != 0 || org.owner
    );

    // Error if there is not an organization that includes that user and they are not in an owned organization
    if (filteredResult.length == 0 && result.ownedOrg.length == 0) {
        return res.status(403).send('You do not have contact with this user.');
    }

    return next();
}

module.exports = checkKnownUser;
