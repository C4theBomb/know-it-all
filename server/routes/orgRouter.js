var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateOrg = require('./org/CreateOrg');
const DeleteOrg = require('./org/DeleteOrg');

router.post('/create', tokenAuth, CreateOrg);
router.delete('/delete', tokenAuth, DeleteOrg);

module.exports = router;
