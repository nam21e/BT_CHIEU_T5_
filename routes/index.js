var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const comments = require("./comments");

router.use("/comments", comments)
module.exports = router;
