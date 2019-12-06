# CMPE-202-Project
## Group Members
 1. Priyanshi Jajoo
 2. Robert Campbell
 3. Wei He
 4. Animesh Swain

## Tasks
  * Priyanshi Jajoo: Frontend and Transaction(Internal/External) APIs, Customer Edit Profile API, Customer Dashboard API. Cloud Deployment.
  * Robert Campbell: 
  * Wei He: Frontend and Adding Account API, Closing Account API, Notifications by Email.
  * Animesh Swain: Database connectivity,database management,MySQL queries

## XP Core Values
  * Priyanshi Jajoo: [Courage](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/XP_Core_Values/Courage.md)
  * Robert Campbell: [Communication](XP_Core_Values/Communication.md)
  * Wei He: [Simplicity](XP_Core_Values/Simplicity.md)
  * Animesh Swain: [Feedback](XP_Core_Values/Feedback.md)

## [Sprint Task Sheet](https://docs.google.com/spreadsheets/d/1F4bL0JAhROn38GWwjtmzH_jjgL__Yx4RxtkrftcPAjE/edit#gid=0)

## [UI Wireframes](https://github.com/rcampbell95/CMPE-202-Project/tree/master/UI_Wireframes)
  
## Development stack diagram
![Development_stack](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/Diagrams/Development%20Stack%20.jpeg)
## Architecture Diagram
![Architecture Diagram](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/Diagrams/Banking%20System_%20Architecture%20Diagram.jpeg)
## Component Design Diagram
![Component Design Diagram](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/Diagrams/Banking%20System_%20Component%20design.jpeg)
## Deployment Diagram
![Deployment Diagram](https://github.com/rcampbell95/CMPE-202-Project/blob/dev/Diagrams/Banking%20System_%20Deployment%20Diagram.jpeg)

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

# Applictaion is running on cloud URI is: 
http://ec2-13-58-133-124.us-east-2.compute.amazonaws.com:5000/




