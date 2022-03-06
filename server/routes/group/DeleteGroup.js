async function DeleteGroup(req, res, next) {
    const user = req.user;
    const groupID = req.params.groupID;

    const result = await user.getOwnedGroup({ where: { groupID: groupID } });

    if (!result) {
        return res.status(400).send('You do not own a group with that ID.');
    }

    await result[0].destroy();

    return res.send('Group deleted');
}

module.exports = DeleteGroup;
