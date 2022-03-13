const { Organization } = require('../../models/index');

async function RemoveOrgMember(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;
    const doomedUserIDs = req.body.doomedUsers;

    const result = await Organization.findByPk(orgID, {
        include: { association: 'orgOwner' },
    });

    if (!result) {
        return res.status(500).send('No organization exists with that id.');
    }

    if (!doomedUserIDs) {
        await result.removeOrgMember({ where: { userID: user.userID } });
    } else {
        if (user.userID == result.orgOwner.userID) {
            await result.removeOrgMembers({
                where: { userID: { [Op.in]: doomedUserIDs } },
            });
        } else {
            res.status(403).send('You do not have permission to do that.');
        }
    }

    return res.send('User(s) removed from organization.');
}

module.exports = RemoveOrgMember;
