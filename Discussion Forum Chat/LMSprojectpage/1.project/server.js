// MEAN Stack RESTful API Tutorial - project List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/projectlist', function (req, res) {
  console.log('I received a GET request');

  db.projectlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/projectlist', function (req, res) {
  console.log(req.body);
  db.projectlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });

app.delete('/projectlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.projectlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/projectlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("Querying the database for record with: " + id);
  db.projectlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/projectlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.projectlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, info: req.body.info}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
