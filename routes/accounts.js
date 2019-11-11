var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
  res.render("accounts/add", { title: 'Banking System - Add Account' })
});

module.exports = router;
