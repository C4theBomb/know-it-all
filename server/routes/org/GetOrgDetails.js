const { Organization, User } = require('../../models/index');

async function GetOrgDetails(req, res, next) {
    const orgID = req.params.orgID;

    const result = await Organization.findOne({ where: { orgID: orgID } });

    return res.send(result);
}

module.exports = GetOrgDetails;
