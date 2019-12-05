var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db/db_config');
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

var database = db.DB;
router.post('/addacct', function(req, res, next) {
    if (req.session.customer_id == null) {
        return res.sendStatus(403);
    }
    // if (req.body.iscustomer == "new") {
    //     // redirect to sign up
    //     res.redirect("/signup?accttype=" + req.body.accttype);
    // } else if (req.body.iscustomer == "existing") {
    console.log(req.body);
    var newAcct = {};
    var newAcctNum;
    // newAcct.customer_id = parseInt(req.body.customer_id);
    // newAcct.routing_num = req.body.routing_num;
    newAcct.customer_id = req.session.customer_id;
    newAcct.routing_num = req.session.routing_num;
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
            if (err) return res.sendStatus(500)
            else {
            console.log("Customer " + newAcct.customer_id + " opened a new " + newAcct.acct_type + " account.");
            }
        });

        //get new account number for emailing it to customer
        sql = "SELECT LAST_INSERT_ID() as acct_num;";
        con.query(sql,function(err,result){
            if (err) return res.sendStatus(500)
            else {
                newAcctNum = result[0].acct_num

                // mailOptions.to = "wei.he@sjsu.edu";
                mailOptions.to = customer_email + "; wei.he@sjsu.edu";
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

            res.sendStatus(200)
        });

        
    });
    
    // mailOptions.to = newAcct.email + "; wei.he@sjsu.edu";

    // db.close();
    // }
})
module.exports = router;