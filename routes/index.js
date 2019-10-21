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


router.get('/customers-info', function(req,res,next){
  var con= mysql.createConnection(database);
  var summary= {
    "data":[]
  };
  con.connect(function(err){
     if(err) throw err;
     console.log("connected!");
     var details="Select name, city from customer;";
     con.query(details, function(err,result){
       if(err) throw err;
       else{
         for(var i=0; i<result.length; i++){
           console.log(result[i].name, result[i].city);
           summary.data.push(result[i]);
         }

       }
       res.json(summary);
     })
  });
});

router.get('/customer-info', function(req,res,next){
    var con =mysql.createConnection(database);
    var id=req.query.id;
  con.connect(function(err){
    if(err) throw err;
    console.log("connected!");
    var info="select * from customer where id=" +id;
    console.log(info);
    con.query(info, function(err,result){
      if(err) throw err;
      else{
        console.log(result.length);
        if(result.length == 0){
          return res.json({});
        } else {
        console.log(result[0]);
        return res.json(result[0]);
        }
      }
     
    })
  });
});

module.exports = router;
