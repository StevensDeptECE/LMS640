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

        res.send({message: 'TODO return all posts'});

      })

      .post(function(req, res) {

        res.send({message: 'create a new post'});
      });

router.route('/posts/:id')

      .get(function(req, res) {
        
        res.send({message: "TODO return a post with Id" + req.params.id});
      })

      .put(function(req, res) {

        res.send({message: "TODO modify a posts with ID" + req.params.id});

      })

      .delete(function(req, res) {

        res.send({message: "TODO delete a posts with ID"  + req.params.id});
      })
module.exports = router;
