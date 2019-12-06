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

      var sql = `Select * from customer where email='${req.query.username}'`;
      con.query(sql,function(err,result){
        if (err) throw err;
        else {
          console.log(req.body.username);
            for(var i= 0; i<result.length; i++){
                
                if(result[0].email=="robertgcampbell95@gmail.com" && result[0].password=="password") {
                  return res.send("admin")
                }
                else if(result[0].email==req.query.username && result[0].password==req.query.password){
                  var client ={};
                  client.name = result[i].firstname;
                  client.fullname = result[i].firstname +"  " + result[i].lastname;
                  client.email=result[i].email;
                  console.log(client);
                  req.session.user = client;
                  return res.send("success");
                }
                
            }
            con.end();                 
            return res.send("Wrong username or Password.");  
       }
      })
    });
  });
  
  
  
  module.exports = router;
  
