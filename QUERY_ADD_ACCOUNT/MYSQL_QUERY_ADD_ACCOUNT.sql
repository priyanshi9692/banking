CREATE TABLE account (
  	acc_num int NOT NULL AUTO_INCREMENT,
  	customer_id int NOT NULL,
  	branch_id varchar(255) NOT NULL,
  	routing_num int NOT NULL,
  	acc_type varchar(45) NOT NULL,
  	balance_amt float NOT NULL,
  	currency varchar(45) NOT NULL,
  	open_date date NOT NULL,
  	PRIMARY KEY (acc_num),
	FOREIGN KEY (customer_id) REFERENCES customer(id)
);