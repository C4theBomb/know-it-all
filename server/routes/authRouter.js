var express = require('express');
var router = express.Router();

const parseFormData = require('../middleware/parseFormData');
const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');
const checkKnownUser = require('../middleware/checkKnownUser');

const CreateUser = require('./auth/CreateUser');
const UpdateUserDetails = require('./auth/UpdateUserDetails');
const Login = require('./auth/Login');
const Logout = require('./auth/Logout');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');
const SetAudio = require('./auth/SetAudio');
const GetOwnedOrgs = require('./auth/GetOwnedOrgs');
const GetMemberOrgs = require('./auth/GetMemberOrgs');
const GetUserDetails = require('./auth/GetUserDetails');

router.post('/register', CreateUser);
router.patch('/update', tokenAuth, UpdateUserDetails);
router.post('/login', basicAuth, Login);
router.post('/logout', tokenAuth, Logout);
router.get('/reset-password', RequestReset);
router.patch('/reset-password/:id', ResetPassword);

router.set('/audio', parseFormData, tokenAuth, SetAudio);

router.get('/', tokenAuth, GetOwnedOrgs);
router.get('/orgs', tokenAuth, GetMemberOrgs);

router.get('/:userID', tokenAuth, checkKnownUser, GetUserDetails);

module.exports = router;
