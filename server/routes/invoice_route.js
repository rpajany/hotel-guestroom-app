const express = require('express');
const router = express.Router();

const { load_Invoice, insert_Invoice, find_Invoice, update_Invoice, delete_Invoice, reset_Invoice } = require('../controllers/invoice_controller');


router.get('/load', load_Invoice);
router.post('/insert', insert_Invoice);
router.post('/find', find_Invoice);
router.put('/update/:Invoice_Date/:Invoice_Number', update_Invoice);
router.delete('/delete/:Invoice_Number', delete_Invoice);
router.get('/reset', reset_Invoice);

module.exports = router;
