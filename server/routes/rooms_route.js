const express = require('express');
const router = express.Router();

const { load_Room, insert_Room, find_Room, update_Room, update_Add_Room, clear_Room, delete_Room, reset_Room } = require('../controllers/rooms_controller');


router.get('/load', load_Room);
router.post('/insert', insert_Room);
router.post('/find', find_Room);
router.put('/update/:Room_Number', update_Room);
router.put('/update_AddRoom/:Room_Number', update_Add_Room);

router.post('/clearRoom', clear_Room);


router.delete('/delete/:ID', delete_Room);
router.get('/reset', reset_Room);

module.exports = router;
