async function UpdateOrgDetails(req, res, next) {
    const user = req.user;
    const groupID = req.params.groupID;
    const groupName = req.body.groupName;

    if (!groupName) {
        return res.status(400).send('Form missing required information.');
    }

    const result = await user.getOwnedGroups({ where: { groupID: groupID } });
    result.update({ groupName: groupName });

    return res.send(result);
}

module.exports = UpdateOrgDetails;
