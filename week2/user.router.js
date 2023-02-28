const { createUser, getUsers, getUserById } = require('./user.controller');
const router = require('express').Router();

router.post('/', createUser);
// router.get('/', getUsers);
router.get('/', getUserById);

module.exports = router;