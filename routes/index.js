var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
var PDF = require('pdfkit');
var fs = require('fs');

router.use(fileUpload());


/* GET home page. */
router.get('/', function(req, res, next) {
  var path = req.query.path;
  console.log('path = '+path);
  res.render('index.ejs', {path: path});
});

router.post('/test', function(req, res, next) {
  console.log(req.body);

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  console.log('files found.');
  console.log(req.files);
  res.status(200).send('Okay');
  // console.log('/test api call');
});

router.post('/upload', function(req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  console.log('files found.');
  console.log(req.files);

  let fileUploaded = req.files;
  console.log(fileUploaded['images[]']);

  writePDF(fileUploaded, './seed/pdf/testing_file.pdf', res);

  // res.send('done');
  // fileUploaded.mv('./seed/img/img.jpg', function(err) {
  //   if (err)
  //     return res.status(500).send(err);
  //
  //   res.send('File uploaded!');
  // });

});

function writePDF(fileUploaded, path, res) {
  let doc = new PDF();
  let writeStream = fs.createWriteStream(path, {flags: "wx"});

  writeStream.on("open", () => {
    console.log("Writing to " + encodeURIComponent(path));
    console.log("write success");
  });
  writeStream.on("error", (err) => {
      if (err.code == "EEXIST") {
          console.log(path + " already exists")
          writeStream.end();

          path = "."+path.split(".")[1]+"-new.pdf"
          writePDF(fileUploaded, path, res);
      } else {
          // Re-raise the error
          throw err;
      }
  });

  doc.pipe(writeStream);
  doc.image(fileUploaded['images[]'].data, 0, 0, {scale: 0.5});
  doc.end();

}
module.exports = router;
