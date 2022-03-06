var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateGroup = require('./group/CreateGroup');
const DeleteGroup = require('./group/DeleteGroup');

router.post('/create', tokenAuth, CreateGroup);
router.delete('/delete/:groupID', tokenAuth, DeleteGroup);

module.exports = router;
