#!/bin/bash

sleepTime=5

function quit {
    echo "Shutting down Dgraph alpha and zero."
    curl -s localhost:8080/admin/shutdown #TODO In the future this endpoint won't work anymore, in favor of GraphQL. We should prepare it.

    kill -9 $(pgrep -f "dgraph zero") > /dev/null     # Kill Dgraph zero.
    kill -9 $(pgrep -f "dgraph alpha") > /dev/null    # I don't wanna wait "clean shutdown" on this context. Let's kill it please...

    if pgrep -x dgraph > /dev/null
    then
      echo "Sleeping for 5 secs so that Dgraph can shutdown."
      sleep 5
    fi

    echo "Clean shutdown done."
    return $1
}

function start {
    echo -e "Starting Dgraph alpha."
    head -c 1024 /dev/random > ./scripts/data/acl-secret.txt
    dgraph alpha -p ./scripts/data/p -w ./scripts/data/w --bindall --my localhost:7080 --acl "access-ttl=1h; refresh-ttl=1d; secret-file=./scripts/data/acl-secret.txt"> data/alpha.log 2>&1 &
    # Wait for membership sync to happen.
    sleep $sleepTime
    return 0
}

function startZero {
    echo -e "Starting Dgraph zero.\n"
    dgraph zero --my localhost:5080 --bindall -w ./scripts/data/wz> data/zero.log 2>&1 &
    # To ensure Dgraph doesn't start before Dgraph zero.
    sleep $sleepTime
}

function init {
    echo -e "Initializing.\n"
    mkdir data
}
