var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const CreateUser = require('./auth/CreateUser');
const UpdateUserDetails = require('./auth/UpdateUserDetails');
const Login = require('./auth/Login');
const Logout = require('./auth/Logout');
const GetUserDetails = require('./auth/GetUserDetails');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');

router.post('/register', CreateUser);
router.patch('/update', tokenAuth, UpdateUserDetails);
router.post('/login', basicAuth, Login);
router.post('/logout', tokenAuth, Logout);
router.get('/:userID', tokenAuth, GetUserDetails);
router.get('/reset-password', RequestReset);
router.patch('/reset-password/:id', ResetPassword);

module.exports = router;
