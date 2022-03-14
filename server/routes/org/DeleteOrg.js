const { Organization } = require('../../models/index');

async function DeleteOrg(req, res, next) {
    const orgID = req.query.orgID;

    await Organization.destroy({ where: { orgID: orgID } });

    return res.send('Organization deleted');
}

module.exports = DeleteOrg;
