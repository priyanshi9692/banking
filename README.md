# CMPE-202-Project
## Development stack diagram
![Development_stack](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/Diagrams/Development%20Stack%20.jpeg)
## Architecture Diagram
![Architecture Diagram](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/Diagrams/Banking%20System_%20Architecture%20Diagram.jpeg)

# Backend
In routes folder we will write backend APIs, look at the example (routes/index.js).

# Frontend
In views we will write frontend like HTML5/Javascript/CSS3.

# Set up application in your local
Open your terminal
Run the following commands

1. git clone https://github.com/rcampbell95/CMPE-202-Project.git
2. cd CMPE-202-Project
3. git pull origin master

# Database Connection 
1. db_config contains the mysql connection string.
2. create database named 'banking' in your local mysql instance.
3. Update this string in db_config file {host: "localhost",user: "root",password: "*******",database:"banking"}

# Running the App
1. npm i
2. node app.js or nodemon app.js 

# Go to browser and paste localhost:5000




