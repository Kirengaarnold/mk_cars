CREATE DATABASE mk;
USE mk;
CREATE TABLE admin(
  admin_id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    password varchar(255) NOT NULL
    
);
CREATE TABLE mk_post(
  post_id int AUTO_INCREMENT PRIMARY KEY,
    postname varchar(100)
);
CREATE TABLE mk_employees(
  employee_id int AUTO_INCREMENT PRIMARY KEY,
    post_id int,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    gender varchar(100) ,
    dateofbirth DATE,
    email varchar(100),
    phonenumber int,
    position varchar(50),
    HireDate DATE,
    salary int,
    status varchar(100),
    department varchar(100),
    address varchar(100),
    FOREIGN KEY(post_id) REFERENCES mk_post(post_id)
);

CREATE TABLE mk_user(
  user_id int AUTO_INCREMENT PRIMARY KEY,
  employee_id int,
  username varchar(100),
  password varchar(255),
    FOREIGN KEY (employee_id) REFERENCES mk_employees(employee_id)
);