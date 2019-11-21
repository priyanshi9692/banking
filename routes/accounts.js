var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
  res.render("accounts/add", { title: 'Banking System - Add Account' })
});

router.post('/add', function(req, res, next) {
    if (req.body.iscustomer == "new") {
        // redirect to sign up
        res.redirect("/signup");
    } else if (req.body.iscustomer == "existing") {
        res.redirect("fund");
    }
})

router.get('/fund', function(req, res, next) {
    res.render("accounts/fund", { title: 'Banking System - Add Account' })
  });

module.exports = router;
