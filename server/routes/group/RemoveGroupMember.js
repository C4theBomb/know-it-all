const { User } = require('../../models/index');

async function RemoveGroupMember(req, res, next) {
    const user = req.user;
    const doomedUserID = req.body.doomedUserID;
    const groupID = req.params.groupID;

    const result = await user.getOwnedGroups({ where: { groupID: groupID } });
    const doomedUser = await User.findByPk(doomedUserID);

    if (result.length == 0) {
        return res.status(500).send('No group exists with that id.');
    }

    await result[0].removeGroupMember(doomedUser);

    return res.send('User added to group.');
}

module.exports = RemoveGroupMember;
