async function AddOrgMember(req, res, next) {
    const user = req.user;
    const groupID = req.params.groupID;

    const result = await user.getOwnedGroups({ where: { groupID: groupID } });

    if (result.length == 0) {
        return res.status(500).send('No group exists with that id.');
    }

    await result[0].addGroupMember(user);

    return res.send('User added to group.');
}

module.exports = AddOrgMember;
