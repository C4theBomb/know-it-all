var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkKnownOrg = require('../middleware/checkKnownOrg');

const CreateOrg = require('./org/CreateOrg');
const DeleteOrg = require('./org/DeleteOrg');
const UpdateOrgDetails = require('./org/UpdateOrgDetails');
const GetOrg = require('./org/GetOrg');
const AddOrgMember = require('./org/AddOrgMember');
const RemoveOrgMember = require('./org/RemoveOrgMember');

router.post('/', tokenAuth, CreateOrg);
router.get('/:orgID', tokenAuth, checkKnownOrg, GetOrg);
router.patch('/:orgID', tokenAuth, UpdateOrgDetails);
router.delete('/:orgID', tokenAuth, DeleteOrg);
router.post('/:orgID/add', tokenAuth, AddOrgMember);
router.post('/:orgID/remove', tokenAuth, RemoveOrgMember);

module.exports = router;
