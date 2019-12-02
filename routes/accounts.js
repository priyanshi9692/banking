var express = require('express');
var router = express.Router();
var session = require('express-session');
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
    // ************* need to remove **********
    req.session.email = 'breehope@me.com'
    // ***************************************

    // Get existing account types for customer
    var con = mysql.createConnection(database);
    con.connect(function(err) {
        if (err) {
            return res.sendStatus(500)
        }
        console.log("Connected!");
        var sql = "SELECT DISTINCT acct_type "
                + "FROM account "
                + "WHERE if_closed IS NULL "
                + "AND customer_id = (SELECT id FROM customer WHERE email = '" + req.session.email + "');";
        con.query(sql,function(err,result){
            if (err) return res.sendStatus(500)
            console.log("Got existing account types for customer.");
            var exg_accts = result.map(x => x.acct_type);
            con.end()
            //******* need to unmark */
            // if (req.session.email == null) {
            //     return res.sendStatus(403);
            // }
            // // ***********************************
            res.render("addacct", { title: 'Banking System - Add Account', exg_accts: exg_accts })
        });
    });
});

router.post('/addacct', function(req, res, next) {
    if (req.session.email == null) {
        return res.sendStatus(403);
    }
    console.log(req.body);
    var newAcct = {};
    var newAcctNum;
    
    newAcct.routing_num = "00001";// hard code
    newAcct.acct_type = req.body.acct_type;
    newAcct.balance_amt = parseFloat(req.body.init_balance);
    newAcct.currency = "$";// hard code
    
    var con = mysql.createConnection(database);
    
    con.connect(function(err) {
        if (err) throw err;

        // Get customer ID by email
        var sql = "SELECT id "
                + "FROM customer "
                + "WHERE email = '" + req.session.email + "';";
        executeSql(con, sql)
            .then((result) => {
                console.log(result[0].id);
                var customer_id = result[0].id;
                console.log(JSON.stringify(newAcct));

                // Open new account
                sql = "INSERT INTO account (acct_num, customer_id, routing_num, acct_type, balance_amt, currency, open_date) " 
                    + "VALUES (FLOOR(RAND()*(999999-100000+1)+100000), " + customer_id + ", '" + newAcct.routing_num + "', '" + newAcct.acct_type 
                    +  "', " + newAcct.balance_amt + ", '" + newAcct.currency + "',  current_timestamp())";
                console.log("Customer " + newAcct.customer_id + " opened a new " + newAcct.acct_type + " account.");
                return executeSql(con, sql)
            })
            .then(() => {
                // Get new account number for emailing it to customer
                sql = "SELECT acct_num, balance_amt "
                    + "From account "
                    + "ORDER BY open_date DESC "
                    + "LIMIT 1";
                return executeSql(con, sql)
            })
            .then((result) => {
                newAcctNum = result[0].acct_num
                con.end();

                mailOptions.to = "wei.he@sjsu.edu";
                // mailOptions.to = req.session.email + "; wei.he@sjsu.edu";
                mailOptions.subject = "Congratulations!You opened a new " + newAcct.acct_type + " account!";
                mailOptions.html = "Dear customer, " + "<br /> <br /> "
                    + "Your new <b>" + newAcct.acct_type + "</b> account number is <b>" + newAcctNum + "</b>. <br/><br /> "
                    + "Initial Balance: " + result[0].balance_amt + "<br/><br /> "
                    + "Regards, <br /> CMPE-202 Group 3";
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Sending success email ' + info.response);
                    }
                });

                res.sendStatus(200)
            })
            .catch(error => {
                res.sendStatus(500)
            })
    });
})

router.post('/closeacct', function(req, res, next) {
    console.log(req.body);
    var closingAcct = {};
    closingAcct.acct_num = parseInt(req.body.acct_num);
    closingAcct.acct_type = req.body.acct_type;
    closingAcct.email = req.session.email;
    console.log(JSON.stringify(closingAcct));

    var con = mysql.createConnection(database);
    con.connect(function(err) {
        if (err) {
            return res.sendStatus(500)
        }
        console.log("Connected!");
        var sql = "UPDATE account " 
                + "SET if_closed = 'Closed' "
                + "WHERE acct_num = " + closingAcct.acct_num + ";";
        con.query(sql,function(err,result){
            if (err) return res.sendStatus(500)
            else {
            console.log("Account " + closingAcct.acct_num + " has been closed.");
            }

            con.end()

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

            res.sendStatus(200)
        });
    });
})

/**
 * Execute given `sql` on a sql connection `con`.
 */
function executeSql(con, sql) {
    return new Promise(function(resolve, reject) {
        con.query(sql, function(err, result){
            if (err) reject(err)

            resolve(result)
        });
    })
    
}

module.exports = router;
