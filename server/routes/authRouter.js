var express = require('express');
var router = express.Router();

const parseFormData = require('../middleware/parseFormData');
const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');
const checkKnownUser = require('../middleware/checkKnownUser');

const Register = require('./auth/Register');
const UpdateUserDetails = require('./auth/UpdateUserDetails');
const Login = require('./auth/Login');
const Remember = require('./auth/Remember');
const Logout = require('./auth/Logout');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');
const SetAudio = require('./auth/SetAudio');
const GetOwnedOrgs = require('./auth/GetOwnedOrgs');
const GetMemberOrgs = require('./auth/GetMemberOrgs');
const GetUserDetails = require('./auth/GetUserDetails');

router.post('/register', Register);
router.post('/login', basicAuth, Login);
router.post('/logout', tokenAuth, Logout);
router.post('/remember', tokenAuth, Remember);

router.patch('/update', tokenAuth, UpdateUserDetails);
router.post('/audio', parseFormData, tokenAuth, SetAudio);

router.get('/reset', RequestReset);
router.patch('/reset/:id', ResetPassword);

router.get('/:userID', tokenAuth, checkKnownUser, GetUserDetails);
router.get('/orgs', tokenAuth, GetOwnedOrgs);
router.get('/orgs/member', tokenAuth, GetMemberOrgs);

module.exports = router;
