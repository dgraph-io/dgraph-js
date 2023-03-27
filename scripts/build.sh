#!/bin/bash

set -e
set -x

source scripts/functions.sh

init
startZero
start

sleep 10 # Dgraph need some time to create Groot user

npm run build

curl http://localhost:8080/health

npm test

quit 0
