const express = require('express');
const router = express.Router();

const { get_BookingNo, update_BookingNo, get_InvoiceNo, update_InvoiceNo, get_CustomerID, update_CustomerID, get_TaxPercentage } = require('../controllers/uid_controller');


router.get('/getBookingNo', get_BookingNo);
router.put('/updateBookingNo', update_BookingNo);

router.get('/getInvoiceNo', get_InvoiceNo);
router.put('/updateInvoiceNo', update_InvoiceNo);

router.get('/getCustomerID', get_CustomerID);
router.put('/updateCustomerID', update_CustomerID);

router.get('/getTaxPercentage', get_TaxPercentage);

// router.delete('/delete/:id', delete_User);
// router.post('/insert', insert_User);
// router.post('/find', find_User);

module.exports = router;
