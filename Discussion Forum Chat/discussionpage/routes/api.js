var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = require('../models/user');
var User = require('../models/user');
var Post = mongoose.model('Posts');
var User = mongoose.model('User');

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
module.exports = router;
