var express = require('express');
var router = express.Router();

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
        newAcct.routing_num = req.body.routing_num;
        newAcct.customer_id = parseInt(req.body.customer_id);
        newAcct.acct_type = req.body.acct_type;
        newAcct.balance_amt = parseFloat(req.body.init_balance);
        newAcct.currency = "$";
        console.log(JSON.stringify(newAcct));

        var con = mysql.createConnection(database);
        con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO account (customer_id, routing_num, acc_type, balance_amt, currency, open_date) " 
                + "VALUES (" + newAcct.customer_id + ", '" + newAcct.routing_num + "', '" + newAcct.acct_type 
                +  "', " + newAcct.balance_amt + ", '$',  current_timestamp())";
        con.query(sql,function(err,result){
            if (err) throw err;
            else {
            console.log("Customer " + newCustomer.firstname + " " + newCustomer.lastname + " opened a new " + newAcct.acct_type + " account.");
            }
        });
        //get new account number for emailing it to customer
        sql = "SELECT acctnum FROM accout WHERE";
        });

        mailOptions.to = newAcct.email + "; wei.he@sjsu.edu";
        mailOptions.subject = "Congratulations!!!You opened a new " + newAcct.acct_type + " account.";
        mailOptions.html = "Hi <b> dear customer</b>, " + "<br /> <br /> Your new " + newAcct.acct_type + " account number is. <br/><br /> Regards, <br /> CMPE-202 Group 3";
        transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Sending success email ' + info.response);
        }
        });

        db.close();
    // }
})

router.post('/postsignup', function(req, res, next) {
    var customer_id = req.body.customer_id
    var routing_num =  req.body.routing_num
    var acc_type = req.body.accttype
    console.log(req.body)

})

router.get('/fundacct', function(req, res, next) {
    res.render("fundacct", { title: 'Banking System - Add Account' })
  });

module.exports = router;
