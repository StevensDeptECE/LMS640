var express = require('express');
var router = express.Router();

/* GET download page. */
router.get('/', function(req, res, next) {
    res.send('<ul>'
        + '<li>Download <a href="/amazing.txt">amazing.txt</a>.</li>'
        + '<li>Download <a href="/ss-5-1492795779537.pdf">ss-5-1492795779537.pdf</a>.</li>'
        + '</ul>');
});


module.exports = router;
