const express = require('express');
const router = express.Router();

const { load_Business, insert_Business, find_Business, update_Business, delete_Business, reset_Business } = require('../controllers/business_controller');


router.get('/load', load_Business);
router.post('/insert', insert_Business);
router.post('/find', find_Business);
router.put('/update/:id', update_Business);
router.delete('/delete/:id', delete_Business);
router.get('/reset', reset_Business);

module.exports = router;
