var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const GetUserDetails = require('./auth/GetUserDetails');
const CreateUser = require('./auth/CreateUser');
const Login = require('./auth/Login');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');
const UpdateUser = require('./auth/UpdateUser');

router.get('/', tokenAuth, GetUserDetails);
router.post('/register', CreateUser);
router.post('/login', basicAuth, Login);
router.get('/reset-password', RequestReset);
router.patch('/reset-password/:id', ResetPassword);
router.patch('/update', tokenAuth, UpdateUser);

module.exports = router;
