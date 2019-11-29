
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
var sql = "select * from account a join customer c ON a.customer_id = c.id where c.email='"+ req.session.user.email + "';";
var info ={
    "data": []
}
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
            return res.send(info);
          });
        });
    });

    router.post('/transaction-info', function(req,res, next) {
      console.log("Input from the user:",req.body);
      var transaction = {};
      var sql="select acct_num,routing_num,balance_amt from account a join customer c ON a.customer_id = c.id where c.email='"+ req.session.user.email + "' and a.acct_type= '"+req.body.type+"';";
      var sql1= "INSERT INTO transactions SET ? ;";
      var con = mysql.createConnection(database);
      con.connect(function(err) {
      if (err) throw err;
      console.log("Connected to DB!");
      con.query(sql,function(err,result){
        if (err) throw err;
        else {
          transaction.from_account_number=result[0].acct_num;
          transaction.from_routing_number=result[0].routing_num;
          transaction.transaction_amt = req.body.amount;
          transaction.transaction_timestamp=new Date();
          transaction.to_account_number=req.body.toAccount;
          transaction.to_routing_number=req.body.toRoutingNum;
          var newBalance = result[0].balance_amt-parseInt(req.body.amount,10);
          var addBalance=parseInt(req.body.amount,10);
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
                var promise =setup(newBalance,req.body.type,transaction.from_account_number);
                promise.then(
                  function(result) { 
                    console.log(result);
                    res.send("success");
                   },
                  function(error) { /* handle an error */ }
                );
                var promise =addTransaction(addBalance,req.body.type,transaction.to_account_number);
                promise.then(
                  function(result) { 
                    console.log(result);
                    res.send("success");
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
      }
    });
  });

  });
}

var addTransaction = function(addBalance,account_type,toAccount) {
  return new Promise(function(resolve, reject) {
 console.log("HerE");
 var sql = "UPDATE account set balance_amt= balance_amt+ "+addBalance+" where acct_type='"+account_type+"' and acct_num='"+toAccount+"';";
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
       }
     });
   });
 
   });
 }

module.exports = router;
  