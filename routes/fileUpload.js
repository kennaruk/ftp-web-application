const fileUpload = require('express-fileupload');
var PDF = require('pdfkit');
var fs = require('fs');

exports.writePDF = (fileUploaded, path, res) => {
    console.log('here');
    let doc = new PDF();
    let writeStream = fs.createWriteStream(path, {flags: "wx"});
  
    writeStream.on("open", () => {
      console.log("Writing to " + encodeURIComponent(path));
      console.log("write success");
      res.send("Upload and create pdf success.")
    });
    writeStream.on("error", (err) => {
        if (err.code == "EEXIST") {
            console.log(path + " already exists")
            writeStream.end();
  
            path = "."+path.split(".")[1]+"-new.pdf"
            writePDF(fileUploaded, path, res);
        } else {
            throw err;
        }
    });
  
    doc.pipe(writeStream);
    doc.image(fileUploaded['images[]'].data, 0, 0, {scale: 0.5});
    doc.end();
  
  }