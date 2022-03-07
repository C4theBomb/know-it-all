const { User } = require('../../models/index');

async function AddGroupMember(req, res, next) {
    const user = req.user;
    const newUserID = req.body.newUserID;
    const groupID = req.params.groupID;

    const result = await user.getOwnedGroups({ where: { groupID: groupID } });
    const newUser = await User.findByPk(newUserID);

    if (result.length == 0) {
        return res.status(500).send('No group exists with that id.');
    }

    await result[0].addGroupMember(newUser);

    return res.send('User added to group.');
}

module.exports = AddGroupMember;
