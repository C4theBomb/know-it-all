const { Organization } = require("../../db/models/index");

const errors = require("../../config/error.json");

async function RemoveOrgMember(req, res) {
    const { user } = req;
    const { orgID } = req.params;
    const doomedUserIDs = req.body.doomedUsers;

    // Verify that an organization exists with the id
    const result = await Organization.findByPk(orgID, {
        include: { association: "owner" },
    });

    if (!result) {
        return res.status(404).send(errors.NotFound);
    }

    // Remove self if doomedUserIDs does not exist, otherwise destroy all users in doomedUserIDs
    if (!doomedUserIDs) {
        await result.removeMember(user.id);
    } else if (user.id === result.owner.id) {
        await result.removeMember(doomedUserIDs);
    } else {
        return res.status(403).send(errors.Forbidden);
    }

    return res.sendStatus(200);
}

module.exports = RemoveOrgMember;
