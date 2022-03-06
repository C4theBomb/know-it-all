const { Op } = require('sequelize');

const { Organization } = require('../../models/index');

async function GetOrgDetails(req, res, next) {
    const user = req.user;
    const orgID = req.params.orgID;

    const result = await Organization.findOne({
        where: {
            orgID: orgID,
        },
    }).then(async (result) => {
        if (!result) {
            return;
        }

        const owner = result.ownerID == user.userID;
        const member = await result.countUsers({
            where: { userID: user.userID },
        });

        if (owner || member) {
            return result;
        }
    });

    console.log(result);

    if (!result) {
        return res
            .status(500)
            .send('You do not know any organizations with this id.');
    }

    return res.send(result);
}

module.exports = GetOrgDetails;
