var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = require('../models/user');
var User = require('../models/user');
var Post = mongoose.model('Posts');
var User = mongoose.model('User');
var Project = require('../models/project');
var Discussion = require('../models/discussion');
var Comment = require('../models/comment');

router.use(function(req, res, next) {
  if(req.method === "GET") {
    return next();
  }
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/#login');
});

router.route('/posts')
      .get(function(req, res) {
        Post.find(function(err,data) {
            if(err) {
              res.send(500, {message:err});
            }
            return res.json(data);
        });
      })

      .post(function(req, res) {
        if(!req.isAuthenticated()) {
          return res.send(401, {message : 'please login first'});
        }

        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function(err,post) {
          if(err) {
            res.send(500,{message: err});
          }
          res.json(post);
        });
      });

router.route('/posts/:id')

      .get(function(req, res) {
        Post.findById(req.params.id, function(err,data) {
          if(err) {
            res.send(err);
          }
          res.json(data);
        });
      })
      //updates specified post
      .put(function(req, res) {
          Post.findById(req.params.id, function(err,post) {
            if(err) {
              res.send(err);
            }
            post.text = req.body.text;
            post.created_by = req.body.created_by;

            post.save(function(err,post) {
              if(err) {
                res.send(err);
              }
              res.json(post);

            });
          });
      })

      .delete(function(req, res) {
        Post.remove({
          _id:req.params.id
        }, function(err) {
          if(err)
            res.send(err);

          res.json({message:"successfully delete"});
        })

      })

      
router.route('/projectlist')
      .get(function (req, res) {
        console.log('I received a GET request');
        Project.find({}, function(err, docs) {
          if (err) {
            res.send(err);
          } else {
            res.json(docs);
          }
        });
      })

      .post(function (req, res) {
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


 router.route('/projectlist/:id')

       .get( function (req, res) {
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
        })

        .delete( function (req, res){
          var id =req.params.id;
          console.log(id);
          Project.remove({ _id: id },function(err,doc){
            res.json(doc);
          });
        })

      .put(function(req, res){
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
        })

      .get( function (req, res) {
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
        })

router.route('/commentlist/:id')

      .get( function (req, res) {
          var id = req.params.id;
          console.log("Querying the database for comments with project id: " + id);
          Comment.find({projectid: id}, function(err, docs) {
            if (err) {
              res.send(err);
            } else {
              res.json(docs);
            }
          });
        })


      .post( function(req,res){
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
        })

router.route('/discussionlist')

      .get( function (req, res) {
          console.log('I received a GET request');
          Discussion.find({}, function(err, docs) {
            if (err) {
              res.send(err);
            } else {
              res.json(docs);
            }
          });
        })

      .post( function (req, res) {
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
        })


router.route('/discussionlist/:id')

      .get(function (req, res) {
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
        })


        .delete( function (req, res){
          var id =req.params.id;
          console.log(id);
          Discussion.remove({ _id: id },function(err,doc){
            res.json(doc);
          });
        })

        .put(function(req, res){
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
        })

// app.listen(port);
// console.log("Server running on port " + port);

router.route('/')
.get( function (req, res) {
res.send('get request');
})

// app.listen(port);
// console.log("Server running on port " + port);



module.exports = router;
