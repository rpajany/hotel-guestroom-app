const express = require('express');
const router = express.Router();

const { load_User, insert_User, find_User, update_User, delete_User, reset_User } = require('../controllers/user_controller');


router.get('/load', load_User);
router.post('/insert', insert_User);
router.post('/find', find_User);
router.put('/update/:username', update_User);
router.delete('/delete/:id', delete_User);
router.get('/reset', reset_User);

module.exports = router;
