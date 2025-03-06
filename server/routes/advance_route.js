const express = require('express');
const router = express.Router();

const { load_Advance, insert_Advance, find_Advance, get_TotalAdvance, update_Advance, delete_Advance, reset_Advance } = require('../controllers/advance_controller');


router.get('/load', load_Advance);
router.post('/insert', insert_Advance);
router.post('/find', find_Advance);
router.post('/getTotalAdvance', get_TotalAdvance);
router.put('/update/:Booking_Number', update_Advance);
router.delete('/delete/:Booking_Number', delete_Advance);
router.get('/reset', reset_Advance);

module.exports = router;
