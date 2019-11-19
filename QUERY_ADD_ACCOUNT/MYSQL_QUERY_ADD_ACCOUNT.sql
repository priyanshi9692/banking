CREATE TABLE account (
  	acc_num int(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  	customer_id int NOT NULL,
  	routing_num varchar(255) NOT NULL,
  	acc_type varchar(45) NOT NULL,
  	balance_amt float NOT NULL,
  	currency varchar(45) NOT NULL,
  	open_date datetime NOT NULL,
  	PRIMARY KEY (acc_num),
	FOREIGN KEY fk_customer_acct(customer_id)
	REFERENCES customer(id)
);

INSERT INTO account (customer_id, routing_num, acc_type, balance_amt, currency, open_date)
VALUES (4, '00001', 'Checking', 200.00, "$",  current_timestamp());