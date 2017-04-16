Run entire stack:

    docker-compose up --build

Test endpoint:

    curl localhost:3000/users

Run unit tests on users service:

    cd users-service/ && yarn run test:unit

Run integration tests on users service:

    cd users-service/ && yarn run test:integration

Run functional test:

    ./functional-test/run.sh

