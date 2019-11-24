var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database = require("../db/db_config").DB
var nodemailer = require('nodemailer');
var mailOptions = {}
var transporter = nodemailer.createTransport({
    // service: 'gmail',
    // auth: {
    // //   user: 'wei.he@sjsu.edu',
    // //   pass: 'Leonardo020513'
    //     user: 'jack.triverson@gmail.com',
    //     pass: '48*atx86'
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6783cd77b2b829",
        pass: "fa1a2b3f8d955f"
    }
  });

router.get('/addacct', function(req, res, next) {
  res.render("addacct", { title: 'Banking System - Add Account' })
});

router.post('/addacct', function(req, res, next) {
    // if (req.body.iscustomer == "new") {
    //     // redirect to sign up
    //     res.redirect("/signup?accttype=" + req.body.accttype);
    // } else if (req.body.iscustomer == "existing") {
    console.log(req.body);
    var newAcct = {};
    var newAcctNum;
    //console.log(req.body.firstname);
    newAcct.customer_id = parseInt(req.body.customer_id);
    newAcct.routing_num = req.body.routing_num;
    newAcct.acct_type = req.body.acct_type;
    newAcct.balance_amt = parseFloat(req.body.init_balance);
    // newAcct.currency = "$";
    console.log(JSON.stringify(newAcct));

    var con = mysql.createConnection(database);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO account (customer_id, routing_num, acct_type, balance_amt, currency, open_date) " 
                + "VALUES (" + newAcct.customer_id + ", '" + newAcct.routing_num + "', '" + newAcct.acct_type 
                +  "', " + newAcct.balance_amt + ", '$',  current_timestamp())";
        con.query(sql,function(err,result){
            if (err) throw err;
            else {
            console.log("Customer " + newAcct.customer_id + " opened a new " + newAcct.acct_type + " account.");
            }
        });

        //get new account number for emailing it to customer
        sql = "SELECT LAST_INSERT_ID() as acct_num;";
        con.query(sql,function(err,result){
            if (err) throw err;
            else {
                newAcctNum = result[0].acct_num
                
                mailOptions.to = "wei.he@sjsu.edu";
                mailOptions.subject = "Congratulations!!!You opened a new " + newAcct.acct_type + " account.";
                mailOptions.html = "Hi <b> dear customer</b>, " + "<br /> <br /> Your new " + newAcct.acct_type + " account number is " + newAcctNum + ". <br/><br /> Regards, <br /> CMPE-202 Group 3";
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Sending success email ' + info.response);
                    }
                });
            }
            con.end();
        });

        
    });
    
    // mailOptions.to = newAcct.email + "; wei.he@sjsu.edu";

    // db.close();
    // }
})

router.post('/closeacct', function(req, res, next) {
    console.log(req.body);
    var closingAcct = {};
    closingAcct.acct_num = parseInt(req.body.acct_num);
    closingAcct.acct_type = req.body.acct_type;
    closingAcct.email = req.body.email;
    console.log(JSON.stringify(closingAcct));

    var con = mysql.createConnection(database);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "UPDATE account " 
                + "SET if_closed = 'Closed' "
                + "WHERE acct_num = " + closingAcct.acct_num + ";";
        con.query(sql,function(err,result){
            if (err) throw err;
            else {
            console.log("Account " + closingAcct.acct_num + " has been closed.");
            }

            con.end()
        });
    });

    mailOptions.to = "wei.he@sjsu.edu";
    // mailOptions.to = closingAcct.email + "; wei.he@sjsu.edu";
    mailOptions.subject = "Your " + closingAcct.acct_type + " account " + closingAcct.acct_num + " has been closed successfully!";
    mailOptions.html = "Hi <b> dear customer</b>, " + "<br /> <br /> Your "
                     + closingAcct.acct_type + " account " + closingAcct.acct_num + " has been closed successfully! <br/><br /> Regards, <br /> CMPE-202 Group 3";
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Sending success email ' + info.response);
        }
    });

    res.send({ OK: 1 })

    // db.close();
    // }
})
// router.post('/postsignup', function(req, res, next) {
//     var customer_id = req.body.customer_id
//     var routing_num =  req.body.routing_num
//     var acc_type = req.body.accttype
//     console.log(req.body)

// })

// router.get('/fundacct', function(req, res, next) {
//     res.render("fundacct", { title: 'Banking System - Add Account' })
//   });

module.exports = router;
