'use strict';

const express = require('express');
const { upload } = require('../helpers/filehelper');

// get all functions
const { singleFileUpload, multipleFileUpload,
    getallSingleFiles, getallMultipleFiles } = require('../controllers/fileUploader_controller');

const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}