var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateOrg = require('./org/CreateOrg');
const DeleteOrg = require('./org/DeleteOrg');
const UpdateOrgDetails = require('./org/UpdateOrgDetails');
const GetOrg = require('./org/GetOrg');
const AddOrgMember = require('./org/AddOrgMember');
const RemoveOrgMember = require('./org/RemoveOrgMember');

router.post('/create', tokenAuth, CreateOrg);
router.delete('/delete', tokenAuth, DeleteOrg);
router.patch('/update', tokenAuth, UpdateOrgDetails);
router.get('/:orgID', tokenAuth, GetOrg);
router.post('/:orgID/add', tokenAuth, AddOrgMember);
router.post('/:orgID/delete', tokenAuth, RemoveOrgMember);

module.exports = router;
