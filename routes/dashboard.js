var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');
var database = db.DB;

router.get('/dashboard', function(req, res, next) {
    // con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    //   var sql = "Select * from customer;";
    //   con.query(sql,function(err,result){
    //     if (err) throw err;
    //     else {
    //       console.log(result);
    //     }
    //   })
  
    // });
    res.render('dashboard',{
        name:req.session.user.fullname,
        email:req.session.user.email
    });
  });

  module.exports = router;