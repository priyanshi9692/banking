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
    res.render('signup',{
        title:"Banking System"
    });
  });

router.post('/', function(req,res, next) {
    console.log("Input from the user:",req.body);
    var newCustomer = {};
    newCustomer.firstname = req.body.firstname;
    newCustomer.lastname = req.body.lastname;
    newCustomer.bdate = req.body.bdate;
    newCustomer.ssn = req.body.ssn;
    newCustomer.email = req.body.email;
    newCustomer.password = req.body.password;
    newCustomer.address = req.body.address;
    newCustomer.city = req.body.city;
    newCustomer.state = req.body.state;
    newCustomer.zipcode = req.body.zipcode;
  
    var con = mysql.createConnection(database);
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
    var sql = "INSERT INTO customer SET ?";
    con.query(sql,newCustomer,function(err,result){
      if (err) throw err;
      else {
        console.log("New Customer Data inserted successfully");
      }
      res.send("Successfully signed up!!");
    });
  });
  });
  
  
  
  module.exports = router;
  