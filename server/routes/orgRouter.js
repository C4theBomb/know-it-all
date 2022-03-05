var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

router.get('/', tokenAuth);

module.exports = router;
