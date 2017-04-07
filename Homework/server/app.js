
"use strict"

const express = require("express");
const app = express();
const path = require('path');
const bp = require('body-parser');
const fs = require('fs');
const busboy = require('connect-busboy');
// let configRoutes = require("./routes");

// configRoutes(app);
console.log(path.resolve(__dirname + '/../public/'));

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }))
app.use(busboy())
// parse application/json
app.use(bp.json())

app.use('/html', express.static(path.resolve(__dirname + '/../public/html/')));
app.use('/css', express.static(path.resolve(__dirname + '/../public/css/')));
app.use('/js', express.static(path.resolve(__dirname + '/../public/js/')));
app.use('/img', express.static(path.resolve(__dirname + '/../public/img/')));

let num = 1;

app.post('/create', function(req, res) {
    console.log('creating new homework');
    console.log(req.body);
    fs.writeFile(__dirname + `/homework-${num++}.json`, JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('saved');
    });
    res.json('{received}');
})

app.get('/create', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/html/hw.html'));
})

app.get('/homework/:hwname',function(req,res){

    let hwname = req.params.hwname;
    res.sendFile(path.join(__dirname, hwname));
    
    // fs.readFile(path.join(__dirname, hwname), function(err,buffer){
    //     if(err) throw err;

    // })
})

app.post('/upload', function(req, res){
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        // console.log(file)
        var fstream = fs.createWriteStream(__dirname + "/" + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send('upload succeeded!');
        });
    });
    res.send("success");
})


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
















