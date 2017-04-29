// MEAN Stack RESTful API Tutorial - project List App

var express = require('express');
var port = 8000;
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');  
var path = require('path');
var http = require('http');
var multer  = require('multer');
var Project = require('./app/models/project');
var Discussion = require('./app/models/discussion');

mongoose.Promise = require('bluebird');

app.use(morgan('dev'));
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); //for parsing application/x-www-form/urlencoded
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/project', function(err) {  //27017 is the mongodb port
  if(err) {
    console.log('Not connected to the database: ' + err);
  } else {
    console.log('Successfully connected to MongoDB');
  }
});

app.get('/', function (req, res) {
  res.send('I Love Bhavi <3');
});

app.get('/projectlist', function (req, res) {
  console.log('I received a GET request');
  Project.find({}, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }  
  });
});
 
app.get('/projectlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("Querying the database for record with: " + id);
  console.log('I received a GET request');
  Project.findOne({_id: id}, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }  
  });
});

app.post('/projectlist', function (req, res) {
  console.log('inserting project');
  var project = new Project();
  project.name = req.body.name;
  project.info = req.body.info;
  project.team = req.body.team;
  project.courseId = req.body.courseId;
  //project.save();
  project.save(function (err, project) {
  if (err) {
    res.send(err);
  } else {
    res.send('project created');
  }
  //project.speak();
  });
});

app.delete('/projectlist/:id', function (req, res){
  var id =req.params.id;
  console.log(id);
  Project.remove({ _id: id },function(err,doc){
    res.json(doc);
  });
});

app.put('/projectlist/:id',function(req, res){
  var id = req.params.id;
  var query = id;
  console.log(id);
  Project.findOneAndUpdate({name: "test"}, {$set:{name: req.body.name, info: req.body.info, team: req.body.team ,courseId: req.body.courseId}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    } else {
      res.json(doc);
    }
  });
});

app.get('/discussionlist', function (req, res) {
  console.log('I received a GET request');
  Discussion.find({}, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }  
  });  
});

app.get('/discussionlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("Querying the database for record with: " + id);
  console.log('I received a GET request');
  Discussion.findOne({_id: id}, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }  
  });
});

app.post('/discussionlist', function (req, res) {
  console.log('inserting discussion into database');
  var discussion = new Discussion();
  discussion.subject = req.body.subject;
  discussion.content = req.body.content;
  discussion.save(function (err, discussion) {
  if (err) {
    res.send(err);
  } else {
    res.send('discussion created');
  }
  });
});

app.delete('/discussionlist/:id', function (req, res){
  var id =req.params.id;
  console.log(id);
  Discussion.remove({ _id: id },function(err,doc){
    res.json(doc);
  });
});

app.put('/discussionlist/:id',function(req, res){
  var id = req.params.id;
  var query = id;
  console.log(id);
  Discussion.findOneAndUpdate({name: "test"}, {$set:{subject: req.body.subject, content: req.body.content}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    } else {
      res.json(doc);
    }
  });
});

app.listen(port);
console.log("Server running on port " + port);
