const express = require('express');
const router = express.Router();
const xss = require('xss');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');

const multer  =   require('multer');

const upload = multer({ dest: './files' });


router.get("/", (req, res) => {
    res.render("layouts/upload");
});

router.post('/upload',upload.single('fileUploaded'),function(req,res){
    if(req.file) {
        var tmp_path = req.file.path;
        var fileId = uuid.v4();
        var target_path = './files/' + fileId;
        // req.body.image = target_path;

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {res.json({message:"File Uploaded Successfully"})});
        src.on('error', function(err) { res.json({error: true,message:err}); });
    }

    res.json({message:"error"});
    // var tmp_path = req.file.fileUploaded.path;
    // var target_path = '/' + req.files.fileUploaded.name;
    // fs.rename(tmp_path,target_path,function(err){
    //     if (err) throw err;
    //     fs.unlink(tmp_path,function(){
    //         if(err) throw err;
    //         res.send('File uploaded to: '+ target_path + '-' + req.files.thumbnail.size + ' bytes ');
    //     });
    // });
   
});


module.exports = router;