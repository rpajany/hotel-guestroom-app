const express = require('express');
const router = express.Router();

const { load_Customer, insert_Customer, find_Customer, update_Customer, delete_Customer, reset_Customer } = require('../controllers/customer_controller');


router.get('/load', load_Customer);
router.post('/insert', insert_Customer);
router.post('/find', find_Customer);
router.put('/update/:Customer_ID', update_Customer);
router.delete('/delete/:Customer_ID', delete_Customer);
router.get('/reset', reset_Customer);

module.exports = router;
