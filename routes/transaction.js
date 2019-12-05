
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');

var database = db.DB;

/* GET home page. */
router.get('/transaction', function(req, res, next) {
    if (req.session && req.session.user) {
    res.render('transaction',{
        name:req.session.user.fullname,
        email:req.session.user.email
    });
} else {
    res.render('signin',{
        title:"Banking System"
    });
}
  });  


/* Get all accounts of customer */
router.get('/getuseraccounts', function(req,res){
var sql = "select * from account a join customer c ON a.customer_id = c.id where c.email='"+ req.session.user.email + "' and a.if_closed is null ;";
var info ={
    "data": []
}
console.log(sql);
var con = mysql.createConnection(database);
    con.connect(function(err) {
      if (err) throw err;
      console.log(req.query);
      con.query(sql,function(err,result){
        if (err) throw err;
        if(result !== undefined){
            for(var i=0;i<result.length;i++){
            var account = {}
            account.type = result[i].acct_type.toUpperCase();
            account.number=result[i].acct_num;
            info.data.push(account);
            }
            
        }
        console.log(info.data);
        con.end();
        return res.send(info);
        
      });
    });
});
router.get('/getbalance', function(req,res){
    var sql = "select balance_amt from account a join customer c ON a.customer_id = c.id where c.email='"+ req.session.user.email + "' and a.acct_type= '"+req.query.type+"';";
    var info ={}
    var con = mysql.createConnection(database);
        con.connect(function(err) {
          if (err) throw err;
          console.log(req.body);
          con.query(sql,function(err,result){
            if (err) throw err;
            if(result !== undefined){
                for(var i=0;i<result.length;i++){
                var account = {}
                account.balance=result[i].balance_amt;
                }
                info=account;
            }
            console.log(info);
            con.end();
            return res.send(info);
          });
        });
    });

router.post('/transaction-money', function(req,res, next) {
      console.log("Input from the user:",req.body);
      var transaction = {};
      var sql="select a.acct_num, a.routing_num, a.balance_amt, a.if_closed from account a join customer c ON a.customer_id = c.id where c.email='"+ req.session.user.email + "' and a.acct_type= '"+req.body.type+"';";
      var sql1= "INSERT INTO transactions SET ? ;";
      var con = mysql.createConnection(database);
      con.connect(function(err) {
      if (err) throw err;
      console.log("Connected to DB!");
      con.query(sql,function(err,result){
        if (err) throw err;
          else{
          transaction.from_account_number=result[0].acct_num;
          transaction.from_routing_number=result[0].routing_num;
          transaction.transaction_amt = req.body.amount;
          transaction.transaction_timestamp=new Date();
          transaction.to_account_number=req.body.toAccount;
          if(req.body.transactionType=="INTERNAL"){
            transaction.to_routing_number=result[0].routing_num;
          }
          else{
            transaction.to_routing_number=req.body.toRoutingNum;
          }
         
          var newBalance = result[0].balance_amt-parseFloat(req.body.amount,10);
          var addBalance=parseFloat(req.body.amount,10);
          console.log(transaction);
          var con1=mysql.createConnection(database);
          con1.connect(function(err) {
            if (err) throw err;
            console.log("Connected to DB!");
            con1.query(sql1,transaction, function(err,result){
              if (err) throw err;
              else{
                console.log(transaction);
                console.log("Data successfully inserted");
                var transaction_id=result.insertId;
                var promise =setup(newBalance,req.body.type,transaction.from_account_number);
                promise.then(
                  function(result) { 
                    var promise1 =addTransaction(addBalance,req.body.type,transaction.to_account_number);
                    promise1.then(
                      function(result1) { 
                        if(req.body.frequency!=="none"){
                          var recurring={};
                          recurring.recurring_amt=req.body.amount;
                          recurring.transaction_id=transaction_id;
                          recurring.frequency=req.body.frequency;
                          console.log(recurring);
                        var promise2 =addFrequency(recurring);
                        promise2.then(
                          function(result2) { 
                            console.log("Successfully added in recurring table",result2);
                            res.send("success");
                           },
                          function(error) { /* handle an error */ }
                        );
                          } else {
                            res.send("success");
                            con1.end();
                          }
                       },
                      function(error) { /* handle an error */ }
                    );
                  
                   },
                  function(error) { /* handle an error */ }
                );
       
               
              }
            
        })
        
      
      });
    }

    });
  });
});
var setup = function(newBalance,account_type,account_num) {
 return new Promise(function(resolve, reject) {
console.log("HerE");
var sql = "UPDATE account set balance_amt="+newBalance+" where acct_type='"+account_type+"' and acct_num='"+account_num+"';";
var con = mysql.createConnection(database);
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
    con.query(sql,function(err,result){
      if (err) {
        console.log(err);
        reject("unsuccessfull");
            }      
            else {
        console.log("Successfully updated");
        resolve("success");
        con.end();
      }
    });
  });

  });
}

var addTransaction = function(addBalance,account_type,toAccount) {
  return new Promise(function(resolve, reject) {
var sql = "UPDATE account set balance_amt= balance_amt+ "+addBalance+" where acct_num='"+toAccount+"';";
 var con = mysql.createConnection(database);
   con.connect(function(err) {
     if (err) throw err;
     console.log("Connected to DB!");
     con.query(sql,function(err,result){
       if (err) {
         console.log(err);
         reject("unsuccessfull");
             }      
             else {
         console.log("Successfully updated");
         resolve("success");
         con.end();
       }
     });
   });
 
   });
 }
 var addFrequency = function(recurring) {
  return new Promise(function(resolve, reject) {

 var sql = "INSERT INTO recurring_payments SET ?";
 var con = mysql.createConnection(database);
   con.connect(function(err) {
     if (err) throw err;
     console.log("Connected to DB!");
     con.query(sql,recurring,function(err,result){
       if (err) {
         console.log(err);
         reject("unsuccessfull");
             }      
             else {
         console.log("Data Inserted Successfully");
         resolve("success");
         con.end();
       }
     });
   });
 
   });
 }

 router.get('/transaction-info', function (req, res, next) {
  var con = mysql.createConnection(database);
  con.connect(function (err) {
    if (err) throw err;
    console.log("QUERY",req.query.acct_type);
    //console.log(database);
    var sql = "SELECT a.acct_type, a.balance_amt, t.to_account_number,t.from_account_number, t.transaction_amt, t.transaction_timestamp, r.frequency FROM customer c JOIN account a ON c.id=a.customer_id JOIN transactions t ON t.from_account_number=a.acct_num LEFT OUTER JOIN recurring_payments r ON t.transaction_id=r.transaction_id WHERE c.email='"+ req.session.user.email + "' and a.acct_type='" + req.query.acct_type +"';";
    console.log(sql);
      var info = {
      "data": []
    };
    //console.log(sql)
    con.query(sql, function (err, result) {
     // console.log(result);
      if (err) {throw err;}
      else {
        //console.log(result);
        info.data = result;
        res.send(info);
        con.end();
      }
    });
  });
});

 
  

module.exports = router;
  