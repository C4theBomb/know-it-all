var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

/* 
User
- Create user
- Change password
- User Login
- User Profile
- Modify user profile

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
