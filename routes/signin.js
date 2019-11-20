var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');

var database = db.DB;

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('signin',{
        title:"Banking System"
    });
  });

router.get('/verify', function(req,res, next) {
    
    var con = mysql.createConnection(database);
    con.connect(function(err) {
      if (err) throw err;
      console.log(req.query);

      var sql = "Select * from customer;";
      con.query(sql,function(err,result){
        if (err) throw err;
        else {
            for(var i= 0; i<result.length; i++){
                //console.log(req.query.username);
                if(result[i].username==req.query.username && result[i].password==req.query.password){
                  var client ={};
                  client.name = result[i].firstname;
                  client.fullname = result[i].firstname +" " + result[i].lastname;
                  client.username=result[i].username;
                  client.email=result[i].email;
                  console.log(client);
                  req.session.user = client;
               return res.send("success");
                } 
            }
            return res.send("Password/Username is incorrect. Please Try again.");
        }
      })
    });
  });
  
  
  
  module.exports = router;
  