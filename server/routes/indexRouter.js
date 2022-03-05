var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    return res.render('index', { title: 'Express' });
});

/*
Organization
- Create organization
- Create organization account
- Add people to organization
- Remove people from organization

Groups
- Create group
- Add people to group
- Remove people from group
- Delete group
*/

module.exports = router;
