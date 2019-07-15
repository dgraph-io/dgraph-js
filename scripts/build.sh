#!/bin/bash

set -e
set -x

npm run build
npm test

echo "Shutting down dgraph via Docker"
docker stop zero && docker container rm zero
docker stop alpha && docker container rm alpha

exit 0
