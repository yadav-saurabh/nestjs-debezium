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

6. run docker compose to get all the services up and running

    ```bash
    docker-compose --env-file .env -f ./infra/compose.yaml up
    ```

7. create connector (user connector)

    - from the debezium ui [`http://localhost:8080/`](http://localhost:8080/>)
    - from the cli using curl

      ``` bash
          # load the env
          source .env
          # create a connector (user-connector) for table user
          curl --location 'http://localhost:8083/connectors' \
              --header 'Accept: application/json' \
              --header 'Content-Type: application/json' \
              --data '{
                "name": "user-connector",
                "config": {
                    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
                    "database.hostname": "nestjs-debezium-postgres",
                    "database.port": "5432",
                    "database.user": "'$DB_USERNAME'",
                    "database.password": "'$DB_PASSWORD'",
                    "database.dbname": "'$DB_DATABASE'",
                    "table.include.list": "public.user",
                    "topic.prefix": "'$KAFKA_TOPIC_PREFIX'"
                  }
                }'
      ```

8. run nestjs server

    ```bash
    npm run dev
    ```

## API'S

### users

- `POST /api/users` :- create a new user
- `PATCH /api/users` :- update a user
- `GET /api/users` :- get all users
- `GET /api/users/:id` :- get a users
- `DELETE /api/users/:id` :- get a users

### cdc

- `GET /cdc/connectors` :- get all connectors
- `PUT /cdc/pause` :- pause a connectors
- `PUT /cdc/resume` :- resume a connectors
