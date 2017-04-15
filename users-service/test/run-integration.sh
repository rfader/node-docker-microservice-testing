#!/bin/bash

docker-compose -p integration-test -f ./test/docker-compose.integration.yml up --abort-on-container-exit --exit-code-from users_test

EXIT_CODE=$?

docker-compose -p integration-test kill
docker-compose -p integration-test rm -f

exit $EXIT_CODE
