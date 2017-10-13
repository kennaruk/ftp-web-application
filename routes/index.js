var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
var PDF = require('pdfkit');
var fs = require('fs');
var fileUploadFn = require('./fileUpload.js');
router.use(fileUpload());


/* GET home page. */
router.get('/', function(req, res, next) {
  var path = req.query.path;
  console.log('path = '+path);
  res.render('index.ejs', {path: path});
});

router.post('/upload', function(req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  console.log('files found.');

  let fileUploaded = req.files;
  console.log(fileUploaded['images[]']);

  fileUploadFn.writePDF(fileUploaded, './seed/pdf/testing_file.pdf', res);

});

module.exports = router;
