router.post('/sign-up', function(req,res, next) {
    console.log(req.body);
    var newCustomer = {};

    ///console.log(req.body.firstname); ???
    newCustomer.branch_id = req.body.branch_id;
    newCustomer.firstname = req.body.firstname;
    newCustomer.lastname = req.body.lastname;
    newCustomer.bdate = req.body.bdate;
    newCustomer.ssn = req.body.ssn;
    newCustomer.email = req.body.email;
    newCustomer.address = req.body.address;
    newCustomer.city = req.body.city;
    newCustomer.state = req.body.state;
    newCustomer.zipcode = req.body.zipcode;
    console.log(JSON.stringify(newCustomer));

    var con = mysql.createConnection(database);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      //********* TBD ************
      var sql = "INSERT INTO customer VALUES('') ?', req.body";
      //**************************
      con.query(sql,function(err,result){
        if (err) throw err;
        else {
          console.log("Customer " + newCustomer.firstname + " " + newCustomer.lastname + " signed up!");
        }
      });
    });
});

//         Mail code
        mailOptions.to = newCustomer.email + "; wei.he@sjsu.edu";
        mailOptions.subject = "Congratulations!!!Signed up as Customer";
        mailOptions.html = "Hi <b>" + newCustomer.firstname + "</b>, " + "<br /> <br /> You are signed up as our customer . <br/><br /> Regards, <br /> CMPE-202 Group 3";
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Sending success email ' + info.response);
          }
        });

        db.close();
      });
    });
