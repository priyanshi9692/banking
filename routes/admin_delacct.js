var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');
var axios = require('axios');
var database = db.DB;


router.get('/', function(req, res, next) {
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
    res.render('admin_delacct');
  });

  module.exports = router;