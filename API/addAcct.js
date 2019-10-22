postAddAccount: (req, res) => {
    console.log(req.body);
    var newAcct = {};
    //console.log(req.body.firstname);
    newAcct.branch_id = req.body.branch_id;
    newAcct.customer_id = req.body.customer_id;
    newAcct.acct_type = req.body.acct_type;
    newAcct.init_balance = req.body.init_balance;
    console.log(JSON.stringify(newAcct));

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("parking_lot");
      var myobj = newAcct;
      dbo.collection("payment").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        //Mail code
        mailOptions.to = newAcct.email + "; priyanshi.jajoo@sjsu.edu";
        mailOptions.subject = "Congratulations!!!Registered as Customer";
        mailOptions.html = "Hi <b>" + newAcct.firstname + "</b>, " + "<br /> <br /> You are registered as our customer . <br/><br /> Regards, <br /> CMPE-272";
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
