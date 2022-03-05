var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');

const CreateUser = require('./auth/CreateUser');
const Login = require('./auth/Login');

router.post('/register', CreateUser);
router.post('/login', basicAuth, Login);

/* 
User
- Change password
- User Login
- User Profile
- Modify user profile
*/

module.exports = router;
