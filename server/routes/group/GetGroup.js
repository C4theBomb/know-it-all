async function GetGroup(req, res, next) {
    const user = req.user;
    const groupID = req.params.groupID;

    const result = await user.getOwnedGroups({
        where: { groupID: groupID },
        include: [{ association: 'groupMembers', required: false }],
    });

    if (result.length == 0) {
        return res.status(500).send('No group exists with that id.');
    }

    return res.send(result[0]);
}

module.exports = GetGroup;
