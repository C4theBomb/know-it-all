const { Organization } = require('../../db/models/index');

async function RemoveOrgMember(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;
    const doomedUserIDs = req.body.doomedUsers;

    const result = await Organization.findByPk(orgID, {
        include: { association: 'owner' },
    });

    if (!result) {
        return res.status(500).send('No organization exists with that id.');
    }

    if (!doomedUserIDs) {
        await result.removeMember(user.id);
    } else {
        if (user.id == result.owner.id) {
            await result.removeMember(doomedUserIDs);
        } else {
            return res
                .status(403)
                .send('You do not have permission to do that.');
        }
    }

    return res.send('User(s) removed from organization.');
}

module.exports = RemoveOrgMember;
