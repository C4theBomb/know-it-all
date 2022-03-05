var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetUserDetails = require('./user/GetUserDetails');
const UpdateUser = require('./user/UpdateUser');
const CreateGroup = require('./user/CreateGroup');
const CreateOrg = require('./user/CreateOrg');

router.get('/', tokenAuth, GetUserDetails);
router.patch('/update', tokenAuth, UpdateUser);
router.post('/group/create', tokenAuth, CreateGroup);
router.post('/org/create', tokenAuth, CreateOrg);

module.exports = router;
