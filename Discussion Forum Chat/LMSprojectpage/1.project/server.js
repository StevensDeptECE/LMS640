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
var Comment = require('./app/models/comment');
var path = require('path');
var http = require('http');
var multer  = require('multer');

mongoose.Promise = require('bluebird');

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })
app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})); //for parsing application/x-www-form/urlencoded
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// upload file server side code
app.post('/savedata', upload.single('file'), function(req,res,next){
    console.log('Upload Successful ', req.file, req.body);
  });

app.post('/savedata', upload.single('file'), function(req,res,next){
     console.log('Uploade Successful ', req.file, req.body);
 });
 http.createServer(app).listen(app.get('port'), function(){
   console.log('Express server listening on port ' + app.get('port'));
 });



mongoose.connect('mongodb://localhost:27017/project', function(err) {  //27017 is the mongodb port
  if(err) {
    console.log('Not connected to the database: ' + err);
  } else {
    console.log('Successfully connected to MongoDB');
  }
});

app.get('/', function (req, res) {
  res.send('get request');
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
  Project.findOneAndUpdate({name: req.body.name}, {$set:{name: req.body.name, info: req.body.info, team: req.body.team ,courseId: req.body.courseId}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    } else {
      res.json(doc);
    }
  });
});

app.get('/commentlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("Querying the database for comments with project id: " + id);
  Comment.find({projectid: id}, function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }  
  });
});

app.post('/commentlist/:id', function(req,res){
  console.log('starting a discussion');
  var comment = new Comment();
  comment.projectid = req.params.id;
  comment.comment= req.body.comment;
  comment.save(function(err, comment){
    if (err) {
    res.send(err);
  } else {
    res.send('discussion started');
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

// app.listen(port);
console.log("Server running on port " + port);
