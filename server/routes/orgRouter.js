var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateOrg = require('./org/CreateOrg');
const DeleteOrg = require('./org/DeleteOrg');
const GetOrgDetails = require('./org/GetOrgDetails');
const UpdateOrgDetails = require('./org/UpdateOrgDetails');

router.post('/create', tokenAuth, CreateOrg);
router.delete('/delete', tokenAuth, DeleteOrg);
router.get('/get-org-details/:orgID', tokenAuth, GetOrgDetails);
router.patch('/update', tokenAuth, UpdateOrgDetails);

module.exports = router;
