var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateOrg = require('./org/CreateOrg');
const DeleteOrg = require('./org/DeleteOrg');
const UpdateOrgDetails = require('./org/UpdateOrgDetails');

router.post('/create', tokenAuth, CreateOrg);
router.delete('/delete', tokenAuth, DeleteOrg);
router.patch('/update', tokenAuth, UpdateOrgDetails);

module.exports = router;
