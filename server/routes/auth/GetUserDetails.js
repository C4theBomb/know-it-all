const { User, Organization } = require('../../models/index');

async function GetUserDetails(req, res, next) {
    const user = req.user;
    const userID = req.params.userID;

    if (user.userID == userID) {
        return res.send(user);
    }

    const result = await User.findOne({
        where: { userID: userID },
        include: [
            {
                model: Organization,
                as: 'memberOrgs',
                include: [
                    {
                        model: User,
                        as: 'orgMembers',
                        where: { userID: user.userID },
                        required: false,
                    },
                    {
                        model: User,
                        as: 'orgOwner',
                        where: { userID: user.userID },
                        required: false,
                    },
                ],
            },
            {
                model: Organization,
                as: 'ownedOrg',
                include: {
                    model: User,
                    as: 'orgMembers',
                    where: { userID: user.userID },
                    required: false,
                },
            },
        ],
    });

    if (!result) {
        return res.status(500).send('No user with that ID exists.');
    }

    const filteredResult = result.memberOrgs.filter(
        (org) => org.orgMembers.length != 0 || org_owner
    );

    if (filteredResult.length == 0 && result.ownedOrg.orgMembers.length == 0) {
        return res.status(403).send('You do not have contact with this user.');
    }

    const { memberOrgs, ownedOrg, ...newResult } = result;
    return res.send(newResult.dataValues);
}

module.exports = GetUserDetails;
