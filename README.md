# hamish-gpt-backend

hamish-gpt-backend

# Development

## Start services

`docker compose up`

# Test

## Build:

`docker-compose -f ./docker-compose-test.yml build`

## Run the database:

`docker-compose -f ./docker-compose-test.yml up`

## Run tests:

`docker-compose -f ./docker-compose-test.yml run --rm test npm test`
