var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkKnownUser = require('../middleware/checkKnownUser');

const CreateGroup = require('./group/CreateGroup');
const DeleteGroup = require('./group/DeleteGroup');
const UpdateGroupDetails = require('./group/UpdateGroupDetails');
const GetGroup = require('./group/GetGroup');
const AddGroupMember = require('./group/AddGroupMember');
const RemoveGroupMember = require('./group/RemoveGroupMember');

router.post('/create', tokenAuth, CreateGroup);
router.delete('/:groupID/delete', tokenAuth, DeleteGroup);
router.patch('/:groupID/update', tokenAuth, UpdateGroupDetails);
router.get('/:groupID', tokenAuth, GetGroup);
router.post('/:groupID/add', tokenAuth, checkKnownUser, AddGroupMember);
router.post('/:groupID/remove', tokenAuth, RemoveGroupMember);

module.exports = router;
