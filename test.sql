CREATE DATABASE db1;
-- \c db1;
CREATE TABLE employees (
	id INT PRIMARY KEY,
	first_name VARCHAR (120),
	last_name VARCHAR (120),
	department VARCHAR (120), 
	salary DECIMAL (10,2)
);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (1, 'Paul', 'Garrix', 'Corporate', 3547.25);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (2, 'Astrid', 'Fox', 'Private Individuals', 2845.56);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (3, 'Matthias', 'Johnson', 'Private Individuals', 3009.41);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (4, 'Lucy', 'Patterson', 'Private Individuals', 3547.25);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (5, 'Tom', 'Page', 'Corporate', 5974.41);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (6, 'Claudia', 'Conte', 'Corporate', 4714.12);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (7, 'Walter', 'Deer', 'Private Individuals', 3547.25);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (8, 'Stephanie', 'Marx', 'Corporate', 2894.51);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (9, 'Luca', 'Pavarotti', 'Private Individuals', 4123.45);
INSERT INTO employees (id, first_name, last_name, department, salary) VALUES (10, 'Victoria', 'Pollock', 'Corporate', 4789.53);

-------------------------------


CREATE DATABASE db2;
-- \c db2;
CREATE TABLE users (
	id INT PRIMARY KEY,
	first_name VARCHAR (120),
	last_name VARCHAR (120),
	email VARCHAR (120)
);
INSERT INTO users (id, first_name, last_name, email) VALUES (1, 'Paul', 'Garrix', 'PaulGarrix@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (2, 'Astrid', 'Fox', 'AstridFox@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (3, 'Matthias', 'Johnson', 'MatthiasJohnson@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (4, 'Lucy', 'Patterson', 'LucyPatterson@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (5, 'Tom', 'Page', 'TomPage@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (6, 'Claudia', 'Conte', 'ClaudiaConte@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (7, 'Walter', 'Deer', 'WalterDeer@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (8, 'Stephanie', 'Marx', 'StephanieMarx@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (9, 'Luca', 'Pavarotti', 'LucaPavarotti@test.com');
INSERT INTO users (id, first_name, last_name, email) VALUES (10, 'Victoria', 'Pollock', 'VictoriaPollock@test.com');

-------------------------------

CREATE DATABASE db3;
-- \c db3;
CREATE TABLE user_details (
  id INT PRIMARY KEY,
  username varchar(255),
  first_name varchar(50),
  last_name varchar(50),
  gender varchar(10)
);
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (1, 'rogers63', 'david', 'john', 'Female');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (2, 'mike28', 'rogers', 'paul', 'Male');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (3, 'rivera92', 'david', 'john', 'Male');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (4, 'ross95', 'maria', 'sanders', 'Male');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (5, 'paul85', 'morris', 'miller', 'Female');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (6, 'smith34', 'daniel', 'michael', 'Female');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (7, 'james84', 'sanders', 'paul', 'Female');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (8, 'daniel53', 'mark', 'mike', 'Male');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (9, 'brooks80', 'morgan', 'maria', 'Female');
INSERT INTO user_details (id, username, first_name, last_name, gender) VALUES (10, 'morgan65', 'paul', 'miller', 'Female');
-------------------------------