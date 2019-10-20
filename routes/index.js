var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');

var database = db.DB;
/* GET home page. */
router.get('/', function(req, res, next) {
  var con = mysql.createConnection(database);
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "Select * from customer;";
    con.query(sql,function(err,result){
      if (err) throw err;
      else {
        console.log(result);
      }
    })

  });
  res.render('index', { title: 'Banking System' });
});


router.get('/customer', function(req, res, next) {
  var con = mysql.createConnection(database);
  var info = {};
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "Select * from customer;";
    con.query(sql,function(err,result){
      if (err) throw err;
      else {
        console.log(result[0].id);
        info = result[0];
      }
      res.json(info);
    })
    
  });
  
});

module.exports = router;
