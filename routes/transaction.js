
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
    res.render('/login/signin',{
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



//req.body.type = "SAVINGS";

  module.exports = router;
  