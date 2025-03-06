const express = require('express');
const router = express.Router();

const { load_Gst, insert_Gst, find_Gst, update_Gst, delete_Gst, reset_Gst } = require('../controllers/gst_controller');


router.get('/load', load_Gst);
router.post('/insert', insert_Gst);
router.post('/find', find_Gst);
router.put('/update/:id', update_Gst);
router.delete('/delete/:id', delete_Gst);
// router.get('/reset', reset_Gst);

module.exports = router;
