const router = require('express').Router();
const { showUser, addUser, updateUser, deleteUser, showUserById } = require('../controler/user');
const { isAdmin } = require('../middlewares/auth');
const { newUserValidator } = require('../middlewares/validatorUser');

router.get('/list-user', showUser);
router.get('/list-user-id/:userId', showUserById);
router.post('/add-user', newUserValidator, addUser);
router.put('/update-user/:userId', updateUser);
router.delete('/delete-user/:userId', deleteUser);


module.exports = router;