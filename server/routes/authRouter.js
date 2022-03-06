var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const GetUserDetails = require('./auth/GetUserDetails');
const CreateUser = require('./auth/CreateUser');
const Login = require('./auth/Login');
const Logout = require('./auth/Logout');
const UpdateUserDetails = require('./auth/UpdateUserDetails');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');

router.post('/register', CreateUser);
router.post('/login', basicAuth, Login);
router.post('/logout', tokenAuth, Logout);
router.get('/:userID', tokenAuth, GetUserDetails);
router.patch('/update', tokenAuth, UpdateUserDetails);
router.get('/reset-password', RequestReset);
router.patch('/reset-password/:id', ResetPassword);

module.exports = router;
