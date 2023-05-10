const express = require('express'),
    router = express.Router(),
    { getUsers, login } = require('../controllers/users-controller');

router.use(express.json());
router.get('/', getUsers);
router.post('/login', login);

module.exports = router;
