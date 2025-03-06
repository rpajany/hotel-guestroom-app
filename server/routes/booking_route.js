const express = require('express');
const router = express.Router();

const { load_Booking, load_BookingByDate, insert_Booking, find_Booking, get_AdvanceAmount, update_AdvanceAmount, update_Booking, delete_Booking, reset_Booking } = require('../controllers/booking_controller');


router.get('/load', load_Booking);
router.post('/load_byDate', load_BookingByDate);
router.post('/insert', insert_Booking);
router.post('/find', find_Booking);
router.post('/getAdvanceAmount', get_AdvanceAmount);
router.put('/updateAdvance/:Booking_Number', update_AdvanceAmount);
router.put('/update/:Booking_Number', update_Booking);
router.delete('/delete/:Booking_Number', delete_Booking);
router.get('/reset', reset_Booking);

module.exports = router;
