#!/bin/bash

docker-compose -p functional-test -f ./functional-test/docker-compose.yml up --abort-on-container-exit --exit-code-from test --build

EXIT_CODE=$?

docker-compose -p functional-test kill
docker-compose -p functional-test rm -f

exit $EXIT_CODE
