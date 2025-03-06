const express = require('express');
const router = express.Router();

const { load_InvoiceDetails, insert_InvoiceDetails, find_InvoiceDetails, filterByDate_InvoiceDetails, update_InvoiceDetails, delete_InvoiceDetails, reset_InvoiceDetails, count_InvoiceDetails } = require('../controllers/invoiceDetails_controller');


router.get('/load', load_InvoiceDetails);
router.post('/insert', insert_InvoiceDetails);
router.post('/find', find_InvoiceDetails);
router.post('/filterByDate', filterByDate_InvoiceDetails);
router.put('/update/:id', update_InvoiceDetails);
router.delete('/delete/:Invoice_Number', delete_InvoiceDetails);
router.post('/count', count_InvoiceDetails)
router.get('/reset', reset_InvoiceDetails);

module.exports = router;
