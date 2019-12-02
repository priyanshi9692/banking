CREATE TABLE account (
  	acct_num int NOT NULL UNIQUE,
  	customer_id int NOT NULL,
  	routing_num varchar(255) NOT NULL,
  	acct_type varchar(45) NOT NULL,
  	balance_amt float NOT NULL,
  	currency varchar(45) NOT NULL,
  	open_date datetime NOT NULL,
  	if_closed VARCHAR(15),
  	PRIMARY KEY (acc_num),
	FOREIGN KEY fk_customer_acct(customer_id)
	REFERENCES customer(id)
);

-- Add new accounts
INSERT INTO account (acct_num, customer_id, routing_num, acct_type, balance_amt, currency, open_date)
VALUES (FLOOR(RAND()*(999999-100000+1)+100000), 4, '00001', 'Checking', 200.00, "$",  current_timestamp());

-- Closing existing accounts
UPDATE account
SET if_closed = 'CLosed'
WHERE acct_num = 0000000005;