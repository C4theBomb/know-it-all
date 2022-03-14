var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');
const checkKnownUser = require('../middleware/checkKnownUser');

const CreateUser = require('./auth/CreateUser');
const UpdateUserDetails = require('./auth/UpdateUserDetails');
const Login = require('./auth/Login');
const Logout = require('./auth/Logout');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');
const GetUserDetails = require('./auth/GetUserDetails');
const GetOwnedOrgs = require('./auth/GetOwnedOrgs');
const GetMemberOrgs = require('./auth/GetMemberOrgs');

router.post('/register', CreateUser);
router.patch('/update', tokenAuth, UpdateUserDetails);
router.post('/login', basicAuth, Login);
router.post('/logout', tokenAuth, Logout);
router.get('/reset-password', RequestReset);
router.patch('/reset-password/:id', ResetPassword);

router.get('/', tokenAuth, GetOwnedOrgs);
router.get('/orgs', tokenAuth, GetMemberOrgs);

router.get('/:userID', tokenAuth, checkKnownUser, GetUserDetails);
module.exports = router;
