var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');
var database = db.DB;
router.get('/editprofile', function(req, res, next) {
    res.render('editprofile',{
        name:req.session.user.fullname,
        email:req.session.user.email
    });
  });
  router.get('/getprofile', function(req, res, next) {
    var con = mysql.createConnection(database);
    var sql= "SELECT * FROM customer WHERE email= '"+req.session.user.email+"';";
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to DB!");
        con.query(sql,function(err,result){
          if (err) throw err;
          else {
            console.log(result);
          }
          res.send(result);
        });
      });
  });

  router.post('/editprofile', function(req,res, next) {
    console.log("Input from the user:",req.body);
    var newCustomer = {};
    newCustomer.firstname = req.body.firstname;
    newCustomer.lastname = req.body.lastname;
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
    var sql = "UPDATE customer SET firstname='"+newCustomer.firstname+"', lastname= '"+newCustomer.lastname+"' ,"
    +"email='"+newCustomer.email+"', password='"+newCustomer.password+"', address='"+newCustomer.address
    +"', city='"+ newCustomer.city+"', state= '"+ newCustomer.state+"', zipcode= "+newCustomer.zipcode
    +" WHERE email= '"+req.session.user.email+"';";
    con.query(sql,function(err,result){
      if (err) throw err;
      else {
        console.log("Customer Data Updated");
        req.session.user.fullname=newCustomer.firstname+" "+newCustomer.lastname;
      }
      res.redirect('/editprofile');
    });
  });
  });

  module.exports = router;