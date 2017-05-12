var express = require('express');
var router = express.Router();
var path = require('path');

router.route('/')
    .get(function(req, res){
        res.render('chatRoom');
    });
module.exports = router;