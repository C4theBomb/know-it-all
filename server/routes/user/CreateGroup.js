async function CreateGroup(req, res, next) {
    const user = req.user;
    const groupName = req.body.groupName;

    if (!groupName) {
        return res.status(400).send('Request missing required form fields.');
    }

    const group = await user.createOwnedGroup({
        groupName: groupName,
    });

    return res.send(group);
}

module.exports = CreateGroup;
