const express = require('express');
const router = express.Router();
const xss = require('xss');
// const notes = data.notes;
const path = require('path');


router.get("/", (req, res) => {
    res.render("layouts/upload");
});

router.post('/upload',function(req,res){
    console.log(req.files);
    var tmp_path = req.files.fileUploaded.path;
    var target_path = '/' + req.files.fileUploaded.name;
    fs.rename(tmp_path,target_path,function(err){
        if (err) throw err;
        fs.unlink(tmp_path,function(){
            if(err) throw err;
            res.send('File uploaded to: '+ target_path + '-' + req.files.thumbnail.size + ' bytes ');
        });
    });
   
});


module.exports = router;