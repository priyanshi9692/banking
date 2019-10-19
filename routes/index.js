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

module.exports = router;
