# Nestjs Debezium

Nestjs Debezium example using postgres

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need.

- Node.js (Version: >= 20.x)
- docker, docker-compose (Version: >= 26.x, 2.x)
- npm

## setup (development)

1. Setup Node If your Node version does not meet the project's requirements as instructed by the docs, either [manually](https://nodejs.org/dist/latest-v20.x/) or using a tool like [nvm](https://github.com/nvm-sh/nvm) or [volta](https://volta.sh/) (recommended)

2. Clone the repo

    ```bash
    git clone git@github.com:yadav-saurabh/nestjs-debezium.git
    ```

3. Go to the project folder

    ```bash
    cd nestjs-debezium
    ```

4. Install packages with yarn

    ```bash
    npm i
    ```

5. Set up your `.env` file

    - Duplicate `.env.example` to `.env`
    - Configure environment variables in the `.env` file. Replace the placeholder values with their applicable values

6. Run docker compose to get all the services up and running

    ```bash
    docker-compose --env-file .env -f ./infra/compose.yaml up
    ```

7. Run nestjs server

    ```bash
    npm run dev
    ```

## API'S

### cdc

- `GET /cdc/connectors` :- get all connectors
- `POST /cdc/connectors` :- get all connectors
    body:

    ```json
    {
        "name": "string",
        "config": {
            "dbHost": "string",
            "dbPort": "number",
            "dbName": "string",
            "dbTableName": "string",
            "dbUsername": "string",
            "dbPassword": "string",
        }
    }
    ```

- `PUT /cdc/pause` :- pause a connectors
    body:

    ```json
    {
        "connector": "string",
    }
    ```

- `PUT /cdc/resume` :- resume a connectors
    body:

    ```json
    {
        "connector": "string",
    }
    ```

## Test

- Connect to psql cli `docker exec -it nestjs-debezium-postgres psql -U debezium -d nestjs-debezium`
- Create database ex: `CREATE DATABASE db1;`
- Connect to the database ex: `\c db1;`
- Create table ex:

    ```sql
    CREATE TABLE employees (
        id INT PRIMARY KEY,
        first_name VARCHAR (120),
        last_name VARCHAR (120),
        department VARCHAR (120), 
        salary DECIMAL (10,2)
    );
    ```

- Add a connector for the database and table to perform cdc ex: `POST /cdc/connectors`

- Perform CRUD on the table ex:

    ```sql
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
    ```
