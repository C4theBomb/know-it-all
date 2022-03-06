var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');
const orgPermission = require('../middleware/orgPermission');

const CreateOrg = require('./org/CreateOrg');
const DeleteOrg = require('./org/DeleteOrg');
const GetOrgDetails = require('./org/GetOrgDetails');
const UpdateOrgDetails = require('./org/UpdateOrgDetails');
const GetOrgMembers = require('./org/GetOrgMembers');

router.post('/create', tokenAuth, CreateOrg);
router.delete('/delete', tokenAuth, DeleteOrg);
router.get('/get-org-details/:orgID', tokenAuth, orgPermission, GetOrgDetails);
router.patch('/update', tokenAuth, UpdateOrgDetails);
router.get('/:orgID', tokenAuth, orgPermission, GetOrgMembers);

module.exports = router;
