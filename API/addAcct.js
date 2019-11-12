router.post('/add', function(req,res, next) {
    console.log(req.body);
    var newAcct = {};
    var newAcctNum;
    //console.log(req.body.firstname);
    //get current date and time
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    newAcct.open_date = dateTime;
    newAcct.branch_id = req.body.branch_id;
    newAcct.customer_id = req.body.customer_id;
    newAcct.acct_type = req.body.acct_type;
    newAcct.init_balance = req.body.init_balance;
    console.log(JSON.stringify(newAcct));

    var con = mysql.createConnection(database);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //********* TBD ************
      var sql = "INSERT INTO accouts VALUES('') ?', req.body";
      //**************************
      con.query(sql,function(err,result){
        if (err) throw err;
        else {
          console.log("Customer " + newCustomer.firstname + " " + newCustomer.lastname + " opened a new " + newAcct.acct_type + " account.");
        }
      });
      //get new account number for emailing it to customer
      sql = "SELECT acctnum FROM accouts WHERE";
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
  });

