const { User } = require('../db/models/index');

const errors = require('../config/error.json');

async function checkKnownUser(req, res, next) {
    const { user } = req;
    const userID = req.params.userID || req.query.userID || req.body.userID;

    // Return result immediately if the user is querying themselves
    if (user.id === userID) {
        return next();
    }

    // Find the queried user and append all the users in adjacent organizations
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
        return res.status(404).send(errors.NotFound);
    }

    // Filter for an organization where the user is a member or an owner
    const filteredResult = result.memberOrg.filter((org) => org.member.length !== 0 || org.owner);

    // Error if there is no relation between the users
    if (filteredResult.length === 0 && result.ownedOrg.length === 0) {
        return res.status(403).send(errors.Forbidden);
    }

    return next();
}

module.exports = checkKnownUser;
