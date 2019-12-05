var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = require('../db/db_config');
var database = db.DB;


router.get('/', function(req, res, next) {
  const id = [parseInt(req.query.id)];

  var con = mysql.createConnection(database);

  con.connect(function(err) {
     if (err) throw err;
     console.log("Connected!");
     var sql = "Select * from account a JOIN customer c ON a.customer_id=c.id where a.customer_id= ?;";
     con.query(sql, id, function(err,result){
       if (err) throw err;
       else {
         res.send(result);
       }
     })

   });
});

module.exports = router;
