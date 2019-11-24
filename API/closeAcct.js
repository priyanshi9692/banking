router.post('/closeacct', function(req, res, next) {
    console.log(req.body);
    var closingAcct = {};
    closingAcct.acct_num = parseInt(req.body.acct_num);
    closingAcct.acct_type = req.body.acct_type;
    closingAcct.email = req.body.email;
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

            // if (result.changedRows === 0)  {
            //     res.statusMessage = "No account found!"
            //     res.status(500).end()
            //     return
            // }

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

    // db.close();
    // }
})